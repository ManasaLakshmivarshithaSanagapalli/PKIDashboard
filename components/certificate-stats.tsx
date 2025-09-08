import { Card, CardContent } from "@/components/ui/card"
import { BadgeIcon as Certificate, Shield, AlertTriangle, CheckCircle } from "lucide-react"

const stats = [
  {
    name: "Total Certificates",
    value: "2,847",
    change: "+12%",
    changeType: "positive",
    icon: Certificate,
    color: "text-cyan-600",
    bgColor: "bg-cyan-100",
  },
  {
    name: "Active CAs",
    value: "8",
    change: "+1",
    changeType: "positive",
    icon: Shield,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    name: "Expiring Soon",
    value: "23",
    change: "-5",
    changeType: "negative",
    icon: AlertTriangle,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    name: "OCSP Healthy",
    value: "99.9%",
    change: "+0.1%",
    changeType: "positive",
    icon: CheckCircle,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
]

export function CertificateStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
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
