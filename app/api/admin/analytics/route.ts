import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Submission from "@/models/Submission"

export async function GET() {
    try {
        await connectDB()

        const now = new Date()
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        // Total submissions
        const totalSubmissions = await Submission.countDocuments({ isSpam: false, isArchived: false })

        // New submissions (last 7 days)
        const newSubmissions = await Submission.countDocuments({
            timestamp: { $gte: sevenDaysAgo },
            isSpam: false,
            isArchived: false
        })

        // Submissions today
        const submissionsToday = await Submission.countDocuments({
            timestamp: { $gte: today },
            isSpam: false,
            isArchived: false
        })

        // Spam count
        const spamCount = await Submission.countDocuments({ isSpam: true })

        // Archived count
        const archivedCount = await Submission.countDocuments({ isArchived: true })

        // Status breakdown
        const statusBreakdown = await Submission.aggregate([
            { $match: { isSpam: false, isArchived: false } },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ])

        // Priority breakdown
        const priorityBreakdown = await Submission.aggregate([
            { $match: { isSpam: false, isArchived: false, status: 'new' } },
            { $group: { _id: '$priority', count: { $sum: 1 } } }
        ])

        // Service popularity
        const serviceStats = await Submission.aggregate([
            { $match: { isSpam: false, isArchived: false } },
            { $group: { _id: '$service', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ])

        // Average response time
        const responseTimeStats = await Submission.aggregate([
            { $match: { responseTime: { $exists: true, $ne: null } } },
            {
                $group: {
                    _id: null,
                    avgResponseTime: { $avg: '$responseTime' },
                    minResponseTime: { $min: '$responseTime' },
                    maxResponseTime: { $max: '$responseTime' }
                }
            }
        ])

        // Conversion rate (contacted / total)
        const contactedCount = await Submission.countDocuments({
            status: { $in: ['contacted', 'completed'] },
            isSpam: false,
            isArchived: false
        })
        const conversionRate = totalSubmissions > 0
            ? ((contactedCount / totalSubmissions) * 100).toFixed(2)
            : '0'

        // Submissions trend (last 30 days)
        const submissionsTrend = await Submission.aggregate([
            {
                $match: {
                    timestamp: { $gte: thirtyDaysAgo },
                    isSpam: false,
                    isArchived: false
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$timestamp' }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ])

        // Response time trend (last 30 days)
        const responseTimeTrend = await Submission.aggregate([
            {
                $match: {
                    respondedAt: { $gte: thirtyDaysAgo },
                    responseTime: { $exists: true }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$respondedAt' }
                    },
                    avgResponseTime: { $avg: '$responseTime' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ])

        // Get current month submissions
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        const submissionsThisMonth = await Submission.countDocuments({
            timestamp: { $gte: currentMonthStart },
            isSpam: false,
            isArchived: false
        })

        return NextResponse.json({
            totalVisitors: totalSubmissions * 3, // Estimate: 3 visitors per submission
            totalSubmissions,
            submissionsThisMonth,
            spamBlocked: spamCount,
            visitorsToday: submissionsToday * 3, // Estimate: 3 visitors per submission today
            // Additional detailed analytics
            overview: {
                totalSubmissions,
                newSubmissions,
                submissionsToday,
                spamCount,
                archivedCount,
                conversionRate: parseFloat(conversionRate)
            },
            statusBreakdown: statusBreakdown.map(item => ({
                status: item._id,
                count: item.count
            })),
            priorityBreakdown: priorityBreakdown.map(item => ({
                priority: item._id,
                count: item.count
            })),
            serviceStats: serviceStats.map(item => ({
                service: item._id,
                count: item.count
            })),
            responseTime: {
                average: responseTimeStats[0]?.avgResponseTime || 0,
                min: responseTimeStats[0]?.minResponseTime || 0,
                max: responseTimeStats[0]?.maxResponseTime || 0
            },
            trends: {
                submissions: submissionsTrend.map(item => ({
                    date: item._id,
                    count: item.count
                })),
                responseTime: responseTimeTrend.map(item => ({
                    date: item._id,
                    avgTime: item.avgResponseTime,
                    count: item.count
                }))
            }
        })
    } catch (error) {
        console.error("Failed to fetch analytics:", error)
        return NextResponse.json(
            { error: "Failed to fetch analytics" },
            { status: 500 }
        )
    }
}
