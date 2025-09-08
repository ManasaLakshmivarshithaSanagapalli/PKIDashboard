import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertTriangle, Globe, Server } from "lucide-react"

const distributionPoints = [
  {
    id: "dp-001",
    url: "http://crl.example.com/root.crl",
    type: "HTTP",
    status: "healthy",
    lastSync: "2 min ago",
    responseTime: "45ms",
    uptime: 99.9,
  },
  {
    id: "dp-002",
    url: "ldap://ldap.example.com/cn=crl",
    type: "LDAP",
    status: "healthy",
    lastSync: "1 min ago",
    responseTime: "78ms",
    uptime: 99.5,
  },
  {
    id: "dp-003",
    url: "http://backup.example.com/crl/",
    type: "HTTP",
    status: "warning",
    lastSync: "15 min ago",
    responseTime: "234ms",
    uptime: 95.2,
  },
  {
    id: "dp-004",
    url: "ftp://ftp.example.com/crl/",
    type: "FTP",
    status: "error",
    lastSync: "2 hours ago",
    responseTime: "timeout",
    uptime: 78.1,
  },
]

const syncSchedule = [
  {
    ca: "Root CA",
    nextSync: "2024-01-22T10:00:00Z",
    frequency: "Weekly",
    status: "scheduled",
  },
  {
    ca: "Intermediate CA",
    nextSync: "2024-01-21T15:30:00Z",
    frequency: "Weekly",
    status: "scheduled",
  },
  {
    ca: "Email CA",
    nextSync: "2024-01-20T08:00:00Z",
    frequency: "Weekly",
    status: "overdue",
  },
]

export function CRLDistribution() {
  return (
    <div className="space-y-6">
      {/* Distribution Points */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="font-heading text-slate-800">Distribution Points</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {distributionPoints.map((dp) => (
            <div key={dp.id} className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {dp.type === "HTTP" ? (
                    <Globe className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Server className="h-4 w-4 text-slate-600" />
                  )}
                  <Badge variant="outline" className="text-xs">
                    {dp.type}
                  </Badge>
                </div>
                <div className="flex items-center space-x-1">
                  {dp.status === "healthy" && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {dp.status === "warning" && <AlertTriangle className="h-4 w-4 text-amber-600" />}
                  {dp.status === "error" && <AlertTriangle className="h-4 w-4 text-red-600" />}
                </div>
              </div>
              <p className="text-sm font-mono text-slate-700 mb-2 break-all">{dp.url}</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <span>Last sync: {dp.lastSync}</span>
                <span>Response: {dp.responseTime}</span>
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>Uptime</span>
                  <span>{dp.uptime}%</span>
                </div>
                <Progress value={dp.uptime} className="h-1" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sync Schedule */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="font-heading text-slate-800">Sync Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {syncSchedule.map((schedule, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium text-slate-900 font-body">{schedule.ca}</p>
                <p className="text-sm text-slate-600">{schedule.frequency}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{new Date(schedule.nextSync).toLocaleDateString()}</p>
                <Badge variant={schedule.status === "overdue" ? "destructive" : "secondary"} className="text-xs">
                  {schedule.status}
                </Badge>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full bg-transparent">
            Configure Schedule
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
