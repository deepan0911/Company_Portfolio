import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Submission from "@/models/Submission"

export async function GET(request: NextRequest) {
    try {
        await connectDB()

        const { searchParams } = new URL(request.url)
        const format = searchParams.get('format') || 'csv' // csv or json

        // Get all submissions (or apply filters if needed)
        const submissions = await Submission.find({ isArchived: false })
            .sort({ timestamp: -1 })
            .lean()

        if (format === 'json') {
            // Return as JSON for Excel import
            return NextResponse.json({
                data: submissions.map(sub => ({
                    ID: sub.id,
                    Name: sub.name,
                    Email: sub.email,
                    Mobile: sub.mobile,
                    Service: sub.service,
                    Message: sub.message,
                    Status: sub.status,
                    Priority: sub.priority,
                    'Is Spam': sub.isSpam ? 'Yes' : 'No',
                    'Is Archived': sub.isArchived ? 'Yes' : 'No',
                    Tags: sub.tags?.join(', ') || '',
                    Notes: sub.notes || '',
                    'Submitted At': new Date(sub.timestamp).toLocaleString(),
                    'Responded At': sub.respondedAt ? new Date(sub.respondedAt).toLocaleString() : '',
                    'Response Time (min)': sub.responseTime || '',
                    'IP Address': sub.ipAddress || '',
                    Source: sub.source || 'website'
                }))
            })
        }

        // Generate CSV
        const headers = [
            'ID', 'Name', 'Email', 'Mobile', 'Service', 'Message',
            'Status', 'Priority', 'Is Spam', 'Is Archived', 'Tags', 'Notes',
            'Submitted At', 'Responded At', 'Response Time (min)', 'IP Address', 'Source'
        ]

        const csvRows = [
            headers.join(','),
            ...submissions.map(sub => [
                sub.id,
                `"${sub.name}"`,
                sub.email,
                sub.mobile,
                `"${sub.service}"`,
                `"${sub.message?.replace(/"/g, '""')}"`,
                sub.status,
                sub.priority,
                sub.isSpam ? 'Yes' : 'No',
                sub.isArchived ? 'Yes' : 'No',
                `"${sub.tags?.join(', ') || ''}"`,
                `"${sub.notes?.replace(/"/g, '""') || ''}"`,
                new Date(sub.timestamp).toLocaleString(),
                sub.respondedAt ? new Date(sub.respondedAt).toLocaleString() : '',
                sub.responseTime || '',
                sub.ipAddress || '',
                sub.source || 'website'
            ].join(','))
        ]

        const csv = csvRows.join('\n')

        return new NextResponse(csv, {
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': `attachment; filename="submissions-${new Date().toISOString().split('T')[0]}.csv"`
            }
        })
    } catch (error) {
        console.error("Failed to export submissions:", error)
        return NextResponse.json(
            { error: "Failed to export submissions" },
            { status: 500 }
        )
    }
}
