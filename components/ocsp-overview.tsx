import { Card, CardContent } from "@/components/ui/card"
import { Server, Activity, CheckCircle, Clock } from "lucide-react"

const ocspStats = [
  {
    name: "Active Responders",
    value: "4",
    change: "+1",
    changeType: "positive",
    icon: Server,
    color: "text-cyan-600",
    bgColor: "bg-cyan-100",
  },
  {
    name: "Requests/Hour",
    value: "12,847",
    change: "+8%",
    changeType: "positive",
    icon: Activity,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    name: "Response Time",
    value: "45ms",
    change: "avg",
    changeType: "neutral",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    name: "Uptime",
    value: "99.9%",
    change: "Last 30 days",
    changeType: "positive",
    icon: CheckCircle,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
]

export function OCSPOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {ocspStats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.name} className="hover:shadow-lg transition-all duration-200 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 font-body">{stat.name}</p>
                  <p className="text-2xl font-bold text-slate-900 font-heading">{stat.value}</p>
                  <p
                    className={`text-sm font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : stat.changeType === "negative"
                          ? "text-red-600"
                          : "text-slate-600"
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
