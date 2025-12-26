import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import connectDB from './mongodb'
import User from '@/models/User'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: 'select_account',
                },
            },
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter your email and password')
                }

                await connectDB()

                // Find user with password field
                const user = await User.findOne({ email: credentials.email }).select('+password')

                if (!user) {
                    throw new Error('No account found with this email')
                }

                if (user.provider !== 'credentials') {
                    throw new Error(`This account uses ${user.provider} sign-in. Please use that method.`)
                }

                if (!user.password) {
                    throw new Error('Invalid credentials')
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

                if (!isPasswordValid) {
                    throw new Error('Invalid password')
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    image: user.image,
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === 'google') {
                await connectDB()

                try {
                    const existingUser = await User.findOne({ email: user.email })

                    if (existingUser) {
                        // Update existing user
                        if (existingUser.provider !== 'google') {
                            // Don't allow Google sign-in if user registered with credentials
                            return false
                        }
                        return true
                    }

                    // Create new user
                    const newUser = new User({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        provider: 'google',
                        emailVerified: new Date(),
                    })
                    await newUser.save()

                    return true
                } catch (error) {
                    console.error('Error in signIn callback:', error)
                    return false
                }
            }

            return true
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
            }
            return session
        },
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signin',
        error: '/auth/signin',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
}
