import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IOTP extends Document {
    email: string
    otp: string
    createdAt: Date
    expiresAt: Date
    verified: boolean
}

const OTPSchema: Schema<IOTP> = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    otp: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 }, // Auto-delete when expired
    },
})

// Prevent model recompilation in development
const OTP: Model<IOTP> = mongoose.models.OTP || mongoose.model<IOTP>('OTP', OTPSchema)

export default OTP
