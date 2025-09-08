"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Activity, Key, Globe, TrendingUp } from "lucide-react"

const stats = [
  {
    name: "Total API Requests",
    value: "12,847",
    change: "+23%",
    changeType: "positive",
    icon: Activity,
    color: "text-cyan-600",
    bgColor: "bg-cyan-100",
  },
  {
    name: "Active API Keys",
    value: "15",
    change: "+2",
    changeType: "positive",
    icon: Key,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    name: "API Endpoints",
    value: "8",
    change: "0",
    changeType: "neutral",
    icon: Globe,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    name: "Success Rate",
    value: "99.2%",
    change: "+0.3%",
    changeType: "positive",
    icon: TrendingUp,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
]

export function APIOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.name} className="hover:shadow-lg transition-all duration-200 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p
                    className={`text-sm font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : stat.changeType === "negative"
                          ? "text-red-600"
                          : "text-slate-500"
                    }`}
                  >
                    {stat.change} from last month
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
