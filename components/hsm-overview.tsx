import { Card, CardContent } from "@/components/ui/card"
import { Key, Shield, Activity, AlertTriangle } from "lucide-react"

const hsmStats = [
  {
    name: "Connected HSMs",
    value: "3",
    change: "+1",
    changeType: "positive",
    icon: Shield,
    color: "text-cyan-600",
    bgColor: "bg-cyan-100",
  },
  {
    name: "Active Keys",
    value: "127",
    change: "+8",
    changeType: "positive",
    icon: Key,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    name: "Operations/Hour",
    value: "2,847",
    change: "+12%",
    changeType: "positive",
    icon: Activity,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    name: "Health Status",
    value: "Healthy",
    change: "All systems",
    changeType: "positive",
    icon: AlertTriangle,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
]

export function HSMOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {hsmStats.map((stat) => {
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
                      stat.changeType === "positive" ? "text-green-600" : "text-red-600"
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
