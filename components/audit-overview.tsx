import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, AlertTriangle, Clock, Shield, Users, Database } from "lucide-react"

export function AuditOverview() {
  const stats = [
    {
      name: "Total Events Today",
      value: "2,847",
      change: "+12%",
      changeType: "positive" as const,
      icon: Activity,
      color: "text-cyan-600",
    },
    {
      name: "Security Alerts",
      value: "3",
      change: "-2 from yesterday",
      changeType: "negative" as const,
      icon: AlertTriangle,
      color: "text-amber-600",
    },
    {
      name: "Failed Operations",
      value: "12",
      change: "+3%",
      changeType: "negative" as const,
      icon: Shield,
      color: "text-red-600",
    },
    {
      name: "Active Sessions",
      value: "24",
      change: "8 admin users",
      changeType: "neutral" as const,
      icon: Users,
      color: "text-emerald-600",
    },
  ]

  const recentActivities = [
    {
      id: "1",
      action: "Certificate Issued",
      resource: "SSL Certificate",
      user: "Alice Johnson",
      timestamp: "2 minutes ago",
      status: "success",
      details: "CN=example.com",
    },
    {
      id: "2",
      action: "CRL Generated",
      resource: "Production CA",
      user: "System",
      timestamp: "15 minutes ago",
      status: "success",
      details: "127 revoked certificates",
    },
    {
      id: "3",
      action: "Login Failed",
      resource: "Admin Portal",
      user: "unknown@example.com",
      timestamp: "23 minutes ago",
      status: "warning",
      details: "Invalid credentials",
    },
    {
      id: "4",
      action: "HSM Health Check",
      resource: "Production HSM",
      user: "System",
      timestamp: "1 hour ago",
      status: "success",
      details: "All systems operational",
    },
  ]

  const systemHealth = [
    { component: "Certificate Authority", status: "healthy", uptime: 99.9 },
    { component: "HSM Integration", status: "healthy", uptime: 99.8 },
    { component: "OCSP Responder", status: "warning", uptime: 98.5 },
    { component: "Database", status: "healthy", uptime: 99.9 },
  ]

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p
                      className={`text-xs ${
                        stat.changeType === "positive"
                          ? "text-emerald-600"
                          : stat.changeType === "negative"
                            ? "text-red-600"
                            : "text-slate-500"
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800 flex items-center gap-2">
              <Clock className="h-5 w-5 text-cyan-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === "success"
                        ? "bg-emerald-500"
                        : activity.status === "warning"
                          ? "bg-amber-500"
                          : "bg-red-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                      <Badge variant={activity.status === "success" ? "default" : "destructive"} className="text-xs">
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600">
                      {activity.resource} • {activity.user}
                    </p>
                    <p className="text-xs text-slate-500">{activity.details}</p>
                    <p className="text-xs text-slate-400 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-slate-800 flex items-center gap-2">
              <Database className="h-5 w-5 text-cyan-600" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((system) => (
                <div key={system.component} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">{system.component}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">{system.uptime}%</span>
                      <Badge variant={system.status === "healthy" ? "default" : "secondary"} className="text-xs">
                        {system.status}
                      </Badge>
                    </div>
                  </div>
                  <Progress
                    value={system.uptime}
                    className={`h-2 ${system.status === "healthy" ? "text-emerald-600" : "text-amber-600"}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
