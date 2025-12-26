import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import OTP from '@/models/OTP'
import User from '@/models/User'
import { generateOTP, getOTPEmailTemplate } from '@/lib/otp'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
    try {
        const { name, email } = await req.json()

        // Validation
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required' },
                { status: 400 }
            )
        }

        // Email validation
        const emailRegex = /^\S+@\S+\.\S+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Please enter a valid email address' },
                { status: 400 }
            )
        }

        await connectDB()

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() })
        if (existingUser) {
            return NextResponse.json(
                { error: 'An account with this email already exists' },
                { status: 400 }
            )
        }

        // Generate OTP
        const otp = generateOTP()
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

        // Delete any existing OTPs for this email
        await OTP.deleteMany({ email: email.toLowerCase() })

        // Create new OTP
        await OTP.create({
            email: email.toLowerCase(),
            otp,
            expiresAt,
            verified: false,
        })

        // Send OTP email
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // Use STARTTLS
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        })

        const { subject, html, text } = getOTPEmailTemplate(otp, name)

        await transporter.sendMail({
            from: `"${process.env.COMPANY_NAME || 'Your Company'}" <${process.env.GMAIL_USER}>`,
            to: email,
            subject,
            text,
            html,
        })

        return NextResponse.json(
            {
                message: 'OTP sent successfully to your email',
                email: email.toLowerCase(),
            },
            { status: 200 }
        )
    } catch (error: any) {
        console.error('Send OTP error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to send OTP. Please try again.' },
            { status: 500 }
        )
    }
}
