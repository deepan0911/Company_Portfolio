import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json()

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Please provide all required fields' },
                { status: 400 }
            )
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
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
            if (existingUser.provider === 'google') {
                return NextResponse.json(
                    { error: 'An account with this email already exists. Please sign in with Google.' },
                    { status: 400 }
                )
            }
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
        })

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
        console.error('Signup error:', error)
        return NextResponse.json(
            { error: error.message || 'Something went wrong. Please try again.' },
            { status: 500 }
        )
    }
}
