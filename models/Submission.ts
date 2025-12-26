import mongoose, { Schema, Model } from 'mongoose'

export interface ISubmission {
    id: string
    name: string
    email: string
    mobile: string
    service: string
    message: string
    timestamp: Date
    status: 'new' | 'contacted' | 'completed'
    isSpam: boolean
    isArchived: boolean
    priority: 'low' | 'medium' | 'high'
    tags: string[]
    notes: string
    respondedAt?: Date
    responseTime?: number // in minutes
    source: string // 'website' | 'referral' | 'other'
    ipAddress?: string
    userAgent?: string
    createdAt?: Date
    updatedAt?: Date
}

const SubmissionSchema = new Schema<ISubmission>({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true
    },
    mobile: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true,
        index: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
        index: true
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'completed'],
        default: 'new',
        index: true
    },
    isSpam: {
        type: Boolean,
        default: false,
        index: true
    },
    isArchived: {
        type: Boolean,
        default: false,
        index: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
        index: true
    },
    tags: {
        type: [String],
        default: []
    },
    notes: {
        type: String,
        default: ''
    },
    respondedAt: {
        type: Date
    },
    responseTime: {
        type: Number // in minutes
    },
    source: {
        type: String,
        default: 'website'
    },
    ipAddress: {
        type: String
    },
    userAgent: {
        type: String
    }
}, {
    timestamps: true
})

// Indexes for performance
SubmissionSchema.index({ timestamp: -1, isSpam: 1, isArchived: 1 })
SubmissionSchema.index({ status: 1, isSpam: 1 })
SubmissionSchema.index({ service: 1, timestamp: -1 })

// Prevent model recompilation during hot reload
const Submission: Model<ISubmission> = mongoose.models.Submission || mongoose.model<ISubmission>('Submission', SubmissionSchema)

export default Submission
