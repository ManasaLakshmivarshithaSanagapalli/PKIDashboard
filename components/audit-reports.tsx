import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Download, Calendar, TrendingUp, FileText, BarChart3 } from "lucide-react"

export function AuditReports() {
  const reports = [
    {
      id: "report-001",
      name: "Certificate Activity Report",
      description: "Comprehensive report of all certificate operations",
      type: "certificate",
      period: "Last 30 days",
      generated: "2024-01-15 09:00:00",
      size: "2.4 MB",
      records: 1247,
      status: "ready",
    },
    {
      id: "report-002",
      name: "Security Audit Report",
      description: "Security events and compliance analysis",
      type: "security",
      period: "Last 7 days",
      generated: "2024-01-15 06:00:00",
      size: "1.8 MB",
      records: 892,
      status: "ready",
    },
    {
      id: "report-003",
      name: "User Activity Report",
      description: "User access and operation tracking",
      type: "user",
      period: "Last 24 hours",
      generated: "2024-01-15 00:00:00",
      size: "456 KB",
      records: 234,
      status: "ready",
    },
    {
      id: "report-004",
      name: "System Performance Report",
      description: "HSM and system performance metrics",
      type: "performance",
      period: "Last 30 days",
      generated: "In Progress",
      size: "-",
      records: 0,
      status: "generating",
    },
  ]

  const analytics = [
    {
      metric: "Certificate Issuance",
      value: "1,247",
      change: "+12%",
      trend: "up",
      description: "Certificates issued this month",
    },
    {
      metric: "Failed Operations",
      value: "23",
      change: "-8%",
      trend: "down",
      description: "Failed operations this week",
    },
    {
      metric: "Security Alerts",
      value: "7",
      change: "+3",
      trend: "up",
      description: "Security alerts this week",
    },
    {
      metric: "System Uptime",
      value: "99.9%",
      change: "0%",
      trend: "stable",
      description: "Average uptime this month",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "default"
      case "generating":
        return "secondary"
      case "error":
        return "destructive"
      default:
        return "default"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-emerald-600" />
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
      default:
        return <div className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analytics.map((item) => (
          <Card key={item.metric} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{item.metric}</p>
                  <p className="text-2xl font-bold text-slate-900">{item.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(item.trend)}
                    <span
                      className={`text-xs ${
                        item.trend === "up"
                          ? "text-emerald-600"
                          : item.trend === "down"
                            ? "text-red-600"
                            : "text-slate-500"
                      }`}
                    >
                      {item.change}
                    </span>
                  </div>
                </div>
                <BarChart3 className="h-8 w-8 text-cyan-600" />
              </div>
              <p className="text-xs text-slate-500 mt-2">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Generation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading text-slate-800">Generate New Report</CardTitle>
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              <FileText className="h-4 w-4 mr-2" />
              Create Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-dashed border-2 border-slate-200 hover:border-cyan-300 cursor-pointer transition-colors">
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <h3 className="font-medium text-slate-900">Compliance Report</h3>
                <p className="text-sm text-slate-600 mt-1">Generate compliance audit report</p>
              </CardContent>
            </Card>
            <Card className="border-dashed border-2 border-slate-200 hover:border-cyan-300 cursor-pointer transition-colors">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <h3 className="font-medium text-slate-900">Performance Report</h3>
                <p className="text-sm text-slate-600 mt-1">System performance analysis</p>
              </CardContent>
            </Card>
            <Card className="border-dashed border-2 border-slate-200 hover:border-cyan-300 cursor-pointer transition-colors">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <h3 className="font-medium text-slate-900">Custom Report</h3>
                <p className="text-sm text-slate-600 mt-1">Create custom date range report</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-slate-800">Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-cyan-600" />
                    <div>
                      <h3 className="font-medium text-slate-900">{report.name}</h3>
                      <p className="text-sm text-slate-600">{report.description}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                        <span>{report.period}</span>
                        <span>•</span>
                        <span>{report.records} records</span>
                        <span>•</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={getStatusColor(report.status)} className="text-xs">
                    {report.status}
                  </Badge>
                  {report.status === "generating" ? (
                    <div className="w-24">
                      <Progress value={65} className="h-2" />
                    </div>
                  ) : (
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
