"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { 
  Calendar, 
  Mail, 
  Shield, 
  Eye, 
  Users, 
  FileText,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Filter
} from "lucide-react"

interface Submission {
  id: string
  name: string
  email: string
  mobile: string
  service: string
  message: string
  timestamp: string
  status: "new" | "read"
}

interface Analytics {
  totalVisitors: number
  totalSubmissions: number
  submissionsThisMonth: number
  spamBlocked: number
  visitorsToday: number
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [password, setPassword] = useState("")
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [analytics, setAnalytics] = useState<Analytics>({
    totalVisitors: 0,
    totalSubmissions: 0,
    submissionsThisMonth: 0,
    spamBlocked: 0,
    visitorsToday: 0
  })
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [activeTab, setActiveTab] = useState<"dashboard" | "submissions">("dashboard")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "new" | "read">("all")

  // Check if user is already authenticated on mount
  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
    }
  }, [isAuthenticated])

  const fetchData = async () => {
    try {
      const [submissionsRes, analyticsRes] = await Promise.all([
        fetch("/api/admin/submissions"),
        fetch("/api/admin/analytics")
      ])
      
      if (submissionsRes.ok) {
        const data = await submissionsRes.json()
        setSubmissions(data.submissions || [])
      }
      
      if (analyticsRes.ok) {
        const data = await analyticsRes.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password check - in production, use proper authentication
    if (password === "admin123") {
      setIsAuthenticated(true)
      localStorage.setItem("adminAuth", "true")
      toast.success("Login successful!")
    } else {
      toast.error("Invalid password. Please try again.")
    }
  }

  const markAsRead = async (id: string) => {
    try {
      await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "read" })
      })
      fetchData()
      toast.success("Submission marked as read")
    } catch (error) {
      console.error("Error updating submission:", error)
      toast.error("Failed to update submission")
    }
  }

  const deleteSubmission = async (id: string) => {
    toast.promise(
      async () => {
        const response = await fetch(`/api/admin/submissions?id=${id}`, {
          method: "DELETE"
        })
        if (!response.ok) throw new Error("Failed to delete")
        fetchData()
        setSelectedSubmission(null)
      },
      {
        loading: "Deleting submission...",
        success: "Submission deleted successfully",
        error: "Failed to delete submission"
      }
    )
  }

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-56 bg-white border-r border-border shadow-sm">
        <div className="p-5 border-b border-border">
          <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-xs text-muted-foreground mt-1">Portfolio Management</p>
        </div>
        
        <nav className="p-3 space-y-1.5">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === "dashboard" 
                ? "bg-primary/10 text-primary border border-primary/20" 
                : "text-foreground hover:bg-muted/50"
            }`}
          >
            Dashboard
          </button>
          
          <button
            onClick={() => setActiveTab("submissions")}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === "submissions" 
                ? "bg-primary/10 text-primary border border-primary/20" 
                : "text-foreground hover:bg-muted/50"
            }`}
          >
            Submissions
          </button>
        </nav>

        <div className="absolute bottom-5 left-3 right-3">
          <Button 
            variant="outline" 
            className="w-full text-sm py-2"
            onClick={() => {
              setIsAuthenticated(false)
              localStorage.removeItem("adminAuth")
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-56 p-8">
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-1">Dashboard</h2>
              <p className="text-muted-foreground text-sm">Here's an overview of your portfolio</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    Total Visitors
                  </div>
                  <div className="text-3xl font-bold mb-1">{analytics.totalVisitors}</div>
                  <div className="text-xs text-green-600 font-medium">
                    +{analytics.visitorsToday} today
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    Total Submissions
                  </div>
                  <div className="text-3xl font-bold">{analytics.totalSubmissions}</div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    This Month
                  </div>
                  <div className="text-3xl font-bold mb-1">{analytics.submissionsThisMonth}</div>
                  <div className="text-xs text-muted-foreground">
                    Resets 1st Jan
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardContent className="p-6">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    Spam Blocked
                  </div>
                  <div className="text-3xl font-bold">{analytics.spamBlocked}</div>
                </CardContent>
              </Card>
            </div>

            {/* Submission History Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold">Email Submission History</CardTitle>
                  <span className="text-xs text-muted-foreground">Showing submissions for the last 12 months</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  {(() => {
                    // Generate last 12 months data
                    const months = []
                    const monthCounts: number[] = []
                    const now = new Date()
                    
                    for (let i = 11; i >= 0; i--) {
                      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
                      const monthName = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
                      months.push(monthName)
                      
                      // Count submissions for this month
                      const count = submissions.filter(s => {
                        const subDate = new Date(s.timestamp)
                        return subDate.getMonth() === date.getMonth() && 
                               subDate.getFullYear() === date.getFullYear()
                      }).length
                      monthCounts.push(count)
                    }
                    
                    const maxCount = Math.max(...monthCounts, 1)
                    const chartHeight = 200
                    const chartWidth = 100
                    
                    // Generate SVG path
                    const points = monthCounts.map((count, index) => {
                      const x = (index / (monthCounts.length - 1)) * chartWidth
                      const y = chartHeight - (count / maxCount) * chartHeight
                      return `${x},${y}`
                    }).join(' ')
                    
                    return (
                      <div className="relative w-full h-full">
                        {/* Chart */}
                        <svg className="w-full h-full" viewBox={`0 0 ${chartWidth} ${chartHeight + 30}`} preserveAspectRatio="none">
                          {/* Grid lines */}
                          {[0, 1, 2, 3, 4].map(i => (
                            <line
                              key={i}
                              x1="0"
                              y1={i * (chartHeight / 4)}
                              x2={chartWidth}
                              y2={i * (chartHeight / 4)}
                              stroke="currentColor"
                              strokeWidth="0.2"
                              className="text-border"
                              opacity="0.3"
                            />
                          ))}
                          
                          {/* Area fill */}
                          <path
                            d={`M 0,${chartHeight} L ${points} L ${chartWidth},${chartHeight} Z`}
                            fill="url(#gradient)"
                            opacity="0.2"
                          />
                          
                          {/* Line */}
                          <polyline
                            points={points}
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          
                          {/* Dots */}
                          {monthCounts.map((count, index) => {
                            const x = (index / (monthCounts.length - 1)) * chartWidth
                            const y = chartHeight - (count / maxCount) * chartHeight
                            return (
                              <circle
                                key={index}
                                cx={x}
                                cy={y}
                                r="1"
                                fill="hsl(var(--primary))"
                              />
                            )
                          })}
                          
                          {/* Gradient definition */}
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                        </svg>
                        
                        {/* Month labels */}
                        <div className="flex justify-between mt-2 px-1">
                          {months.map((month, index) => (
                            index % 2 === 0 ? (
                              <span key={index} className="text-xs text-muted-foreground">
                                {month}
                              </span>
                            ) : null
                          ))}
                        </div>
                        
                        {/* Legend */}
                        <div className="absolute top-0 right-0 flex items-center gap-2 text-xs">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-sm bg-primary"></div>
                            <span className="text-muted-foreground">Submissions: {monthCounts[monthCounts.length - 1]}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "submissions" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-1">Form Submissions</h2>
                <p className="text-muted-foreground text-sm">View all contact form submissions</p>
              </div>
              <div className="text-sm text-muted-foreground">
                Total: <span className="font-semibold text-foreground">{submissions.length}</span>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-gradient-to-r from-card via-card to-card/95 rounded-lg border border-border/50 shadow-sm">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search Input */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Search Submissions
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      <Input
                        placeholder="Search by name, email, mobile, service, or message..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-11 bg-background border-border/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div className="lg:w-64">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Filter by Status
                    </label>
                    <div className="relative">
                      <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as "all" | "new" | "read")}
                        className="w-full h-11 pl-10 pr-10 rounded-md border border-border/60 bg-background text-sm font-medium text-foreground appearance-none cursor-pointer focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all hover:border-border shadow-sm"
                      >
                        <option value="all">All Submissions</option>
                        <option value="new">New Only</option>
                        <option value="read">Read Only</option>
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="overflow-hidden border-border">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr className="bg-muted/20 border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground border-r border-border w-16">
                          S.No
                        </th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground border-r border-border">
                          Submitted At
                        </th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground border-r border-border">
                          Name
                        </th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground border-r border-border">
                          Email
                        </th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground border-r border-border">
                          Phone
                        </th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground border-r border-border">
                          Message
                        </th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">
                          Subject
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-background">
                      {(() => {
                        // Filter submissions based on search and status
                        const filteredSubmissions = submissions.filter((submission) => {
                          // Status filter
                          if (statusFilter !== "all" && submission.status !== statusFilter) {
                            return false
                          }

                          // Search filter
                          if (searchQuery) {
                            const query = searchQuery.toLowerCase()
                            return (
                              submission.name.toLowerCase().includes(query) ||
                              submission.email.toLowerCase().includes(query) ||
                              submission.mobile.toLowerCase().includes(query) ||
                              submission.service.toLowerCase().includes(query) ||
                              submission.message.toLowerCase().includes(query)
                            )
                          }

                          return true
                        })

                        // Generate rows - either with data or empty
                        const rowsToDisplay = 10 // Show at least 10 rows
                        const rows = []

                        // Add data rows
                        for (let i = 0; i < rowsToDisplay; i++) {
                          const submission = filteredSubmissions[i]
                          
                          if (submission) {
                            // Row with data
                            rows.push(
                              <tr 
                                key={submission.id}
                                className="border-b border-border hover:bg-muted/10 transition-colors"
                              >
                                <td className="py-2 px-3 text-foreground/90 border-r border-border align-top text-center font-medium">
                                  {i + 1}
                                </td>
                                <td className="py-2 px-3 text-foreground/90 border-r border-border align-top">
                                  {new Date(submission.timestamp).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}, {new Date(submission.timestamp).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </td>
                                <td className="py-2 px-3 text-foreground border-r border-border align-top">
                                  {submission.name}
                                </td>
                                <td className="py-2 px-3 text-foreground/80 border-r border-border align-top">
                                  {submission.email}
                                </td>
                                <td className="py-2 px-3 text-foreground/80 border-r border-border align-top">
                                  {submission.mobile}
                                </td>
                                <td className="py-2 px-3 text-foreground/80 border-r border-border align-top">
                                  <div className="max-w-xs">
                                    {submission.message}
                                  </div>
                                </td>
                                <td className="py-2 px-3 text-foreground/80 align-top">
                                  {submission.service}
                                </td>
                              </tr>
                            )
                          } else {
                            // Empty row
                            rows.push(
                              <tr 
                                key={`empty-${i}`}
                                className="border-b border-border hover:bg-muted/10 transition-colors"
                              >
                                <td className="py-2 px-3 border-r border-border align-top h-8">&nbsp;</td>
                                <td className="py-2 px-3 border-r border-border align-top h-8">&nbsp;</td>
                                <td className="py-2 px-3 border-r border-border align-top">&nbsp;</td>
                                <td className="py-2 px-3 border-r border-border align-top">&nbsp;</td>
                                <td className="py-2 px-3 border-r border-border align-top">&nbsp;</td>
                                <td className="py-2 px-3 border-r border-border align-top">&nbsp;</td>
                                <td className="py-2 px-3 align-top">&nbsp;</td>
                              </tr>
                            )
                          }
                        }

                        return rows
                      })()}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Pagination Info */}
            <div className="flex items-center justify-between text-sm text-muted-foreground px-2">
              <div>
                Showing{" "}
                <span className="font-medium text-foreground">
                  {(() => {
                    const filteredCount = submissions.filter((submission) => {
                      if (statusFilter !== "all" && submission.status !== statusFilter) return false
                      if (searchQuery) {
                        const query = searchQuery.toLowerCase()
                        return (
                          submission.name.toLowerCase().includes(query) ||
                          submission.email.toLowerCase().includes(query) ||
                          submission.mobile.toLowerCase().includes(query) ||
                          submission.service.toLowerCase().includes(query) ||
                          submission.message.toLowerCase().includes(query)
                        )
                      }
                      return true
                    }).length
                    
                    if (filteredCount === 0) return "0"
                    return `1-${filteredCount}`
                  })()}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">{submissions.length}</span>{" "}
                submissions
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
