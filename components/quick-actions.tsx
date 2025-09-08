import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Download, RefreshCw, Settings } from "lucide-react"

const actions = [
  {
    name: "Issue Certificate",
    description: "Create a new certificate",
    icon: Plus,
    color: "bg-cyan-600 hover:bg-cyan-700",
  },
  {
    name: "Generate CRL",
    description: "Update revocation list",
    icon: RefreshCw,
    color: "bg-slate-600 hover:bg-slate-700",
  },
  {
    name: "Export Reports",
    description: "Download audit reports",
    icon: Download,
    color: "bg-green-600 hover:bg-green-700",
  },
  {
    name: "System Settings",
    description: "Configure PKI settings",
    icon: Settings,
    color: "bg-amber-600 hover:bg-amber-700",
  },
]

export function QuickActions() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="font-heading text-slate-800">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Button
              key={action.name}
              variant="outline"
              className="w-full justify-start h-auto p-4 hover:scale-105 transition-all duration-200 bg-transparent"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full text-white ${action.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="font-medium font-body">{action.name}</p>
                  <p className="text-sm text-slate-500">{action.description}</p>
                </div>
              </div>
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
}
