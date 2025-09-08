"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileX, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export function RequestOverview() {
  const stats = [
    {
      title: "Pending Requests",
      value: "24",
      change: "+5 today",
      icon: Clock,
      color: "text-amber-600",
    },
    {
      title: "Approved Today",
      value: "18",
      change: "Processing",
      icon: CheckCircle,
      color: "text-emerald-600",
    },
    {
      title: "Rejected",
      value: "3",
      change: "This week",
      icon: XCircle,
      color: "text-red-600",
    },
    {
      title: "Awaiting Review",
      value: "12",
      change: "High priority",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
  ]

  const recentRequests = [
    {
      id: "REQ-2024-001",
      subject: "CN=api.example.com",
      type: "TLS Server",
      status: "pending_review",
      submittedBy: "john.doe@example.com",
      time: "2 hours ago",
    },
    {
      id: "REQ-2024-002",
      subject: "CN=John Doe",
      type: "Client Auth",
      status: "approved",
      submittedBy: "jane.smith@example.com",
      time: "4 hours ago",
    },
    {
      id: "REQ-2024-003",
      subject: "CN=mail.company.com",
      type: "S/MIME",
      status: "identity_verification",
      submittedBy: "admin@company.com",
      time: "6 hours ago",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Stats Cards */}
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
              <Icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        )
      })}

      {/* Recent Requests */}
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle className="font-black text-cyan-800">Recent Certificate Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileX className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">{request.id}</p>
                    <p className="text-sm text-slate-500">
                      {request.subject} • {request.type}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={request.status === "approved" ? "default" : "secondary"}>
                    {request.status.replace("_", " ")}
                  </Badge>
                  <p className="text-xs text-slate-500 mt-1">{request.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
