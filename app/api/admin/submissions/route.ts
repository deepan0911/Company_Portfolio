import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Submission from "@/models/Submission"

// GET - Fetch submissions with filters and search
export async function GET(request: NextRequest) {
    try {
        await connectDB()

        const { searchParams } = new URL(request.url)

        // Parse query parameters
        const status = searchParams.get('status')
        const isSpam = searchParams.get('isSpam')
        const isArchived = searchParams.get('isArchived')
        const priority = searchParams.get('priority')
        const service = searchParams.get('service')
        const search = searchParams.get('search')
        const startDate = searchParams.get('startDate')
        const endDate = searchParams.get('endDate')
        const limit = parseInt(searchParams.get('limit') || '100')
        const skip = parseInt(searchParams.get('skip') || '0')

        // Build query
        const query: any = {}

        if (status) query.status = status
        if (isSpam !== null && isSpam !== undefined) query.isSpam = isSpam === 'true'
        if (isArchived !== null && isArchived !== undefined) query.isArchived = isArchived === 'true'
        if (priority) query.priority = priority
        if (service) query.service = service

        // Date range filter
        if (startDate || endDate) {
            query.timestamp = {}
            if (startDate) query.timestamp.$gte = new Date(startDate)
            if (endDate) query.timestamp.$lte = new Date(endDate)
        }

        // Search across multiple fields
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { mobile: { $regex: search, $options: 'i' } },
                { message: { $regex: search, $options: 'i' } },
                { service: { $regex: search, $options: 'i' } }
            ]
        }

        // Fetch submissions with pagination
        const submissions = await Submission.find(query)
            .sort({ timestamp: -1 })
            .limit(limit)
            .skip(skip)
            .lean()

        // Get total count for pagination
        const total = await Submission.countDocuments(query)

        return NextResponse.json({
            submissions: submissions.map(sub => ({
                ...sub,
                _id: sub._id.toString(),
                timestamp: sub.timestamp.toISOString(),
                respondedAt: sub.respondedAt?.toISOString(),
                createdAt: sub.createdAt?.toISOString(),
                updatedAt: sub.updatedAt?.toISOString()
            })),
            total,
            limit,
            skip
        })
    } catch (error) {
        console.error("Failed to fetch submissions:", error)
        return NextResponse.json(
            { error: "Failed to fetch submissions" },
            { status: 500 }
        )
    }
}

// PATCH - Update submission (single or bulk)
export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json()
        const { ids, id, updates } = body

        if ((!id && !ids) || !updates) {
            return NextResponse.json(
                { error: "ID(s) and updates are required" },
                { status: 400 }
            )
        }

        await connectDB()

        // Handle bulk update
        if (ids && Array.isArray(ids)) {
            const updateData: any = { ...updates }

            // If marking as contacted, set respondedAt and calculate response time
            if (updates.status === 'contacted' && !updates.respondedAt) {
                updateData.respondedAt = new Date()
            }

            const result = await Submission.updateMany(
                { id: { $in: ids } },
                { $set: updateData }
            )

            // Calculate response times for newly contacted submissions
            if (updates.status === 'contacted') {
                const submissions = await Submission.find({ id: { $in: ids } })
                for (const sub of submissions) {
                    if (sub.respondedAt && !sub.responseTime) {
                        const responseTime = Math.round(
                            (sub.respondedAt.getTime() - sub.timestamp.getTime()) / (1000 * 60)
                        )
                        await Submission.findOneAndUpdate(
                            { id: sub.id },
                            { responseTime }
                        )
                    }
                }
            }

            return NextResponse.json({
                success: true,
                modified: result.modifiedCount
            })
        }

        // Handle single update
        const updateData: any = { ...updates }

        // If marking as contacted, set respondedAt and calculate response time
        if (updates.status === 'contacted') {
            const submission = await Submission.findOne({ id })
            if (submission && !submission.respondedAt) {
                updateData.respondedAt = new Date()
                updateData.responseTime = Math.round(
                    (new Date().getTime() - submission.timestamp.getTime()) / (1000 * 60)
                )
            }
        }

        const submission = await Submission.findOneAndUpdate(
            { id },
            { $set: updateData },
            { new: true }
        )

        if (!submission) {
            return NextResponse.json(
                { error: "Submission not found" },
                { status: 404 }
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Failed to update submission:", error)
        return NextResponse.json(
            { error: "Failed to update submission" },
            { status: 500 }
        )
    }
}

// DELETE - Delete submission(s)
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")
        const ids = searchParams.get("ids")

        if (!id && !ids) {
            return NextResponse.json(
                { error: "ID or IDs are required" },
                { status: 400 }
            )
        }

        await connectDB()

        // Handle bulk delete
        if (ids) {
            const idArray = ids.split(',')
            const result = await Submission.deleteMany({ id: { $in: idArray } })
            return NextResponse.json({
                success: true,
                deleted: result.deletedCount
            })
        }

        // Handle single delete
        const result = await Submission.findOneAndDelete({ id })

        if (!result) {
            return NextResponse.json(
                { error: "Submission not found" },
                { status: 404 }
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Failed to delete submission:", error)
        return NextResponse.json(
            { error: "Failed to delete submission" },
            { status: 500 }
        )
    }
}


