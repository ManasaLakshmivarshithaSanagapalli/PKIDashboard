"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RefreshCw, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const healthMetrics = [
  {
    name: "Connection Status",
    status: "healthy",
    value: "3/4 Connected",
    percentage: 75,
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    name: "Key Operations",
    status: "healthy",
    value: "Normal",
    percentage: 92,
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    name: "Response Time",
    status: "warning",
    value: "245ms avg",
    percentage: 68,
    icon: Clock,
    color: "text-amber-600",
  },
  {
    name: "Error Rate",
    status: "healthy",
    value: "0.02%",
    percentage: 98,
    icon: CheckCircle,
    color: "text-green-600",
  },
]

const recentAlerts = [
  {
    id: 1,
    type: "warning",
    message: "High response time detected on Development HSM",
    timestamp: "5 minutes ago",
    hsm: "Development HSM",
  },
  {
    id: 2,
    type: "error",
    message: "Connection lost to Backup HSM",
    timestamp: "2 hours ago",
    hsm: "Backup HSM",
  },
  {
    id: 3,
    type: "info",
    message: "Key rotation completed successfully",
    timestamp: "1 day ago",
    hsm: "Production HSM",
  },
]

export function HSMHealthMonitor() {
  return (
    <div className="space-y-6">
      {/* Health Metrics */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading text-slate-800">Health Metrics</CardTitle>
            <Button variant="ghost" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {healthMetrics.map((metric) => {
            const Icon = metric.icon
            return (
              <div key={metric.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className={`h-4 w-4 ${metric.color}`} />
                    <span className="text-sm font-medium font-body">{metric.name}</span>
                  </div>
                  <span className="text-sm text-slate-600">{metric.value}</span>
                </div>
                <Progress value={metric.percentage} className="h-2" />
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="font-heading text-slate-800">Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="p-1 rounded-full">
                  {alert.type === "error" && <AlertTriangle className="h-4 w-4 text-red-600" />}
                  {alert.type === "warning" && <Clock className="h-4 w-4 text-amber-600" />}
                  {alert.type === "info" && <CheckCircle className="h-4 w-4 text-blue-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 font-body">{alert.message}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {alert.hsm}
                    </Badge>
                    <span className="text-xs text-slate-500">{alert.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
