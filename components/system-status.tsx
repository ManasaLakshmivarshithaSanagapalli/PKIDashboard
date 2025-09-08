import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle } from "lucide-react"

const systemComponents = [
  {
    name: "Root CA",
    status: "healthy",
    lastCheck: "2 min ago",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    name: "HSM Connection",
    status: "healthy",
    lastCheck: "1 min ago",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    name: "OCSP Responder",
    status: "warning",
    lastCheck: "5 min ago",
    icon: AlertCircle,
    color: "text-amber-600",
  },
  {
    name: "CRL Distribution",
    status: "healthy",
    lastCheck: "3 min ago",
    icon: CheckCircle,
    color: "text-green-600",
  },
]

export function SystemStatus() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="font-heading text-slate-800">System Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {systemComponents.map((component) => {
          const Icon = component.icon
          return (
            <div
              key={component.name}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Icon className={`h-5 w-5 ${component.color}`} />
                <div>
                  <p className="font-medium text-slate-900 font-body">{component.name}</p>
                  <p className="text-sm text-slate-500">{component.lastCheck}</p>
                </div>
              </div>
              <Badge variant={component.status === "healthy" ? "default" : "secondary"}>{component.status}</Badge>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
