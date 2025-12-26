import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
    name: string
    email: string
    password?: string
    image?: string
    provider: 'credentials' | 'google'
    emailVerified?: Date
    createdAt: Date
    updatedAt: Date
}

const UserSchema: Schema<IUser> = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
        },
        password: {
            type: String,
            // Only required for credentials provider
            required: function (this: IUser) {
                return this.provider === 'credentials'
            },
            minlength: [6, 'Password must be at least 6 characters'],
            select: false, // Don't return password by default
        },
        image: {
            type: String,
        },
        provider: {
            type: String,
            enum: ['credentials', 'google'],
            default: 'credentials',
        },
        emailVerified: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
)

// Prevent model recompilation in development
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User
