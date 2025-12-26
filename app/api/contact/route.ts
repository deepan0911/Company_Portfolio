import { NextRequest, NextResponse } from "next/server"
import { randomUUID } from "crypto"
import connectDB from "@/lib/mongodb"
import Submission from "@/models/Submission"
import { sendAutoReplyEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, email, mobile, service, message } = body

        // Basic validation
        if (!name || !email || !mobile || !service || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            )
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            )
        }

        // Connect to MongoDB
        await connectDB()

        // Get IP address and user agent
        const ipAddress = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown'
        const userAgent = request.headers.get('user-agent') || 'unknown'

        // Create submission object
        const submission = await Submission.create({
            id: randomUUID(),
            name,
            email,
            mobile,
            service,
            message,
            timestamp: new Date(),
            status: "new",
            isSpam: false,
            isArchived: false,
            priority: "medium",
            source: "website",
            ipAddress,
            userAgent,
            tags: [],
            notes: ""
        })

        // Send auto-reply email to customer
        const autoReplyResult = await sendAutoReplyEmail({
            customerName: name,
            customerEmail: email,
            service,
            message,
        })

        if (!autoReplyResult.success) {
            console.error('Failed to send auto-reply email:', autoReplyResult.error)
            // Note: We don't fail the request if email fails, just log it
        }

        // Admin notification disabled - check admin panel for submissions
        // const adminNotificationResult = await sendAdminNotification({
        //     customerName: name,
        //     customerEmail: email,
        //     customerMobile: mobile,
        //     service,
        //     message,
        // })

        return NextResponse.json({
            success: true,
            message: "Form submitted successfully",
            emailSent: autoReplyResult.success
        })
    } catch (error) {
        console.error("Contact form error:", error)
        return NextResponse.json(
            { error: "Failed to submit form" },
            { status: 500 }
        )
    }
}
