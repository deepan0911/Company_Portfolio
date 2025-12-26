import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const ANALYTICS_FILE = path.join(process.cwd(), "data", "analytics.json")

async function ensureDataDir() {
    const dataDir = path.join(process.cwd(), "data")
    try {
        await fs.access(dataDir)
    } catch {
        await fs.mkdir(dataDir, { recursive: true })
    }
}

async function readAnalytics() {
    try {
        await ensureDataDir()
        const data = await fs.readFile(ANALYTICS_FILE, "utf-8")
        return JSON.parse(data)
    } catch {
        return {
            totalVisitors: 0,
            visitorsToday: 0,
            lastVisitDate: new Date().toISOString().split('T')[0],
            spamBlocked: 0
        }
    }
}

async function writeAnalytics(data: any) {
    await ensureDataDir()
    await fs.writeFile(ANALYTICS_FILE, JSON.stringify(data, null, 2))
}

export async function POST(request: NextRequest) {
    try {
        const analytics = await readAnalytics()
        const today = new Date().toISOString().split('T')[0]

        // Reset daily counter if it's a new day
        if (analytics.lastVisitDate !== today) {
            analytics.visitorsToday = 0
            analytics.lastVisitDate = today
        }

        // Increment counters
        analytics.totalVisitors += 1
        analytics.visitorsToday += 1

        await writeAnalytics(analytics)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Analytics tracking error:", error)
        return NextResponse.json(
            { error: "Failed to track visit" },
            { status: 500 }
        )
    }
}
