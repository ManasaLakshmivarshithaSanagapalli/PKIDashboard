import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeIcon as Certificate, Shield, AlertTriangle, User } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "certificate_issued",
    description: "TLS certificate issued for api.example.com",
    user: "John Doe",
    timestamp: "2 minutes ago",
    icon: Certificate,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "certificate_revoked",
    description: "Certificate revoked for old.example.com",
    user: "Jane Smith",
    timestamp: "15 minutes ago",
    icon: AlertTriangle,
    color: "text-red-600",
  },
  {
    id: 3,
    type: "ca_created",
    description: "New intermediate CA created: Dev-CA-2024",
    user: "Admin",
    timestamp: "1 hour ago",
    icon: Shield,
    color: "text-cyan-600",
  },
  {
    id: 4,
    type: "user_login",
    description: "User logged into PKI dashboard",
    user: "Bob Wilson",
    timestamp: "2 hours ago",
    icon: User,
    color: "text-slate-600",
  },
]

export function RecentActivity() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="font-heading text-slate-800">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <div className="p-2 bg-slate-100 rounded-full">
                  <Icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 font-body">{activity.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-xs text-slate-500">by {activity.user}</p>
                    <span className="text-xs text-slate-400">•</span>
                    <p className="text-xs text-slate-500">{activity.timestamp}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
