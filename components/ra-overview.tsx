import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle, XCircle, AlertTriangle, Users, FileText } from "lucide-react"

export function RAOverview() {
  const stats = [
    {
      title: "Pending Requests",
      value: "24",
      change: "+3 from yesterday",
      icon: Clock,
      color: "text-amber-600",
    },
    {
      title: "Approved Today",
      value: "18",
      change: "+12% from yesterday",
      icon: CheckCircle,
      color: "text-emerald-600",
    },
    {
      title: "Rejected Today",
      value: "2",
      change: "-50% from yesterday",
      icon: XCircle,
      color: "text-red-600",
    },
    {
      title: "Verification Required",
      value: "7",
      change: "+2 from yesterday",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
  ]

  const workflowStats = [
    { stage: "Initial Review", count: 8, percentage: 33 },
    { stage: "Identity Verification", count: 7, percentage: 29 },
    { stage: "Final Approval", count: 6, percentage: 25 },
    { stage: "CA Processing", count: 3, percentage: 13 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cyan-800">{stat.value}</div>
                <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-black text-cyan-800 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Request Workflow Status
            </CardTitle>
            <CardDescription>Current requests by workflow stage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {workflowStats.map((stage) => (
              <div key={stage.stage} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">{stage.stage}</span>
                  <Badge variant="secondary">{stage.count} requests</Badge>
                </div>
                <Progress value={stage.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-black text-cyan-800 flex items-center gap-2">
              <Users className="h-5 w-5" />
              RA Operator Activity
            </CardTitle>
            <CardDescription>Active operators and their workload</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Alice Johnson", role: "Senior RA Officer", active: 8, completed: 12 },
                { name: "Bob Smith", role: "RA Officer", active: 6, completed: 9 },
                { name: "Carol Davis", role: "Identity Verifier", active: 4, completed: 15 },
                { name: "David Wilson", role: "RA Officer", active: 6, completed: 8 },
              ].map((operator) => (
                <div key={operator.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-medium text-slate-900">{operator.name}</div>
                    <div className="text-sm text-slate-500">{operator.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-cyan-700">{operator.active} active</div>
                    <div className="text-xs text-slate-500">{operator.completed} completed today</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
