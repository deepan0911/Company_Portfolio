import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import OTP from '@/models/OTP'
import User from '@/models/User'

export async function POST(req: NextRequest) {
    try {
        const { email, otp, name, password } = await req.json()

        // Validation
        if (!email || !otp || !name || !password) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            )
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            )
        }

        await connectDB()

        // Find OTP
        const otpRecord = await OTP.findOne({
            email: email.toLowerCase(),
            otp: otp.trim(),
        })

        if (!otpRecord) {
            return NextResponse.json(
                { error: 'Invalid OTP code' },
                { status: 400 }
            )
        }

        // Check if OTP is expired
        if (new Date() > otpRecord.expiresAt) {
            await OTP.deleteOne({ _id: otpRecord._id })
            return NextResponse.json(
                { error: 'OTP has expired. Please request a new one.' },
                { status: 400 }
            )
        }

        // Check if OTP is already verified
        if (otpRecord.verified) {
            return NextResponse.json(
                { error: 'This OTP has already been used' },
                { status: 400 }
            )
        }

        // Check if user already exists (double check)
        const existingUser = await User.findOne({ email: email.toLowerCase() })
        if (existingUser) {
            return NextResponse.json(
                { error: 'An account with this email already exists' },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12)

        // Create user
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            provider: 'credentials',
            emailVerified: new Date(), // Email is verified via OTP
        })

        // Mark OTP as verified and delete it
        await OTP.deleteOne({ _id: otpRecord._id })

        return NextResponse.json(
            {
                message: 'Account created successfully',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
            { status: 201 }
        )
    } catch (error: any) {
        console.error('Verify OTP error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to verify OTP. Please try again.' },
            { status: 500 }
        )
    }
}
