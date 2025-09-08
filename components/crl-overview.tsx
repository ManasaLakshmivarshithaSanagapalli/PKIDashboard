import { Card, CardContent } from "@/components/ui/card"
import { FileX, Clock, CheckCircle, AlertTriangle } from "lucide-react"

const crlStats = [
  {
    name: "Active CRLs",
    value: "8",
    change: "+2",
    changeType: "positive",
    icon: FileX,
    color: "text-cyan-600",
    bgColor: "bg-cyan-100",
  },
  {
    name: "Revoked Certificates",
    value: "47",
    change: "+3",
    changeType: "positive",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    name: "Next Update",
    value: "2 hours",
    change: "Scheduled",
    changeType: "neutral",
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    name: "Distribution Status",
    value: "Healthy",
    change: "All endpoints",
    changeType: "positive",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
]

export function CRLOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {crlStats.map((stat) => {
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
