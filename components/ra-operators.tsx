import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { UserPlus, Settings, Clock, CheckCircle } from "lucide-react"

export function RAOperators() {
  const operators = [
    {
      id: "op-001",
      name: "Alice Johnson",
      email: "alice.johnson@company.com",
      role: "Senior RA Officer",
      status: "online",
      permissions: ["approve_certificates", "reject_requests", "manage_verification"],
      stats: {
        active_requests: 8,
        completed_today: 12,
        completed_week: 67,
        approval_rate: 94,
        avg_processing_time: "2.3 hours",
      },
      specializations: ["Extended Validation", "Code Signing"],
      last_activity: "2 minutes ago",
    },
    {
      id: "op-002",
      name: "Bob Smith",
      email: "bob.smith@company.com",
      role: "RA Officer",
      status: "online",
      permissions: ["approve_certificates", "reject_requests"],
      stats: {
        active_requests: 6,
        completed_today: 9,
        completed_week: 45,
        approval_rate: 89,
        avg_processing_time: "3.1 hours",
      },
      specializations: ["Domain Validation", "SSL Certificates"],
      last_activity: "15 minutes ago",
    },
    {
      id: "op-003",
      name: "Carol Davis",
      email: "carol.davis@company.com",
      role: "Identity Verifier",
      status: "away",
      permissions: ["identity_verification", "document_review"],
      stats: {
        active_requests: 4,
        completed_today: 15,
        completed_week: 89,
        approval_rate: 96,
        avg_processing_time: "1.8 hours",
      },
      specializations: ["Identity Verification", "Document Authentication"],
      last_activity: "1 hour ago",
    },
    {
      id: "op-004",
      name: "David Wilson",
      email: "david.wilson@company.com",
      role: "RA Officer",
      status: "offline",
      permissions: ["approve_certificates", "reject_requests"],
      stats: {
        active_requests: 6,
        completed_today: 8,
        completed_week: 38,
        approval_rate: 91,
        avg_processing_time: "2.7 hours",
      },
      specializations: ["Organization Validation", "S/MIME Certificates"],
      last_activity: "3 hours ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-emerald-500"
      case "away":
        return "bg-amber-500"
      case "offline":
        return "bg-slate-400"
      default:
        return "bg-slate-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "Online"
      case "away":
        return "Away"
      case "offline":
        return "Offline"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">RA Operators</h3>
          <p className="text-sm text-slate-600">Manage Registration Authority operators and their permissions</p>
        </div>
        <Button className="bg-cyan-600 hover:bg-cyan-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Operator
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {operators.map((operator) => (
          <Card key={operator.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`/abstract-geometric-shapes.png?height=48&width=48&query=${operator.name}`} />
                      <AvatarFallback className="bg-cyan-100 text-cyan-700 font-semibold">
                        {operator.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(operator.status)}`}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold text-slate-900">{operator.name}</CardTitle>
                    <CardDescription className="text-sm">{operator.role}</CardDescription>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {getStatusText(operator.status)}
                      </Badge>
                      <span className="text-xs text-slate-500">{operator.last_activity}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span className="text-xs text-slate-600">Active Requests</span>
                  </div>
                  <div className="text-lg font-semibold text-cyan-700">{operator.stats.active_requests}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-slate-400" />
                    <span className="text-xs text-slate-600">Completed Today</span>
                  </div>
                  <div className="text-lg font-semibold text-emerald-600">{operator.stats.completed_today}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Approval Rate</span>
                  <span className="text-sm font-medium text-slate-900">{operator.stats.approval_rate}%</span>
                </div>
                <Progress value={operator.stats.approval_rate} className="h-2" />
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Specializations</span>
                <div className="flex flex-wrap gap-1">
                  {operator.specializations.map((spec) => (
                    <Badge key={spec} variant="outline" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Permissions</span>
                <div className="flex flex-wrap gap-1">
                  {operator.permissions.map((permission) => (
                    <Badge key={permission} variant="secondary" className="text-xs">
                      {permission.replace("_", " ")}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
                  <div>
                    <span className="block">Avg. Processing</span>
                    <span className="font-medium text-slate-900">{operator.stats.avg_processing_time}</span>
                  </div>
                  <div>
                    <span className="block">This Week</span>
                    <span className="font-medium text-slate-900">{operator.stats.completed_week} completed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
