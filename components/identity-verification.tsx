import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, FileText, Phone, Building } from "lucide-react"

export function IdentityVerification() {
  const verificationMethods = [
    {
      id: "domain",
      name: "Domain Validation",
      description: "Verify domain ownership through DNS or HTTP validation",
      icon: Building,
      active: 12,
      completed: 45,
      success_rate: 94,
    },
    {
      id: "organization",
      name: "Organization Validation",
      description: "Verify organization details through official records",
      icon: FileText,
      active: 8,
      completed: 23,
      success_rate: 87,
    },
    {
      id: "extended",
      name: "Extended Validation",
      description: "Comprehensive verification including legal entity validation",
      icon: CheckCircle,
      active: 3,
      completed: 12,
      success_rate: 92,
    },
    {
      id: "phone",
      name: "Phone Verification",
      description: "Verify contact information through phone calls",
      icon: Phone,
      active: 5,
      completed: 34,
      success_rate: 89,
    },
  ]

  const pendingVerifications = [
    {
      id: "VER-001",
      requestId: "REQ-2024-001",
      subject: "CN=John Doe, O=Acme Corp",
      method: "Extended Validation",
      status: "in_progress",
      assignedTo: "Carol Davis",
      progress: 65,
      nextStep: "Legal entity verification",
      documents: ["Business License", "Articles of Incorporation"],
      contact: "john.doe@acme.com",
    },
    {
      id: "VER-002",
      requestId: "REQ-2024-002",
      subject: "CN=api.example.com",
      method: "Domain Validation",
      status: "waiting_response",
      assignedTo: "Bob Smith",
      progress: 30,
      nextStep: "DNS TXT record verification",
      documents: ["Domain ownership proof"],
      contact: "admin@example.com",
    },
    {
      id: "VER-003",
      requestId: "REQ-2024-005",
      subject: "CN=secure.company.com",
      method: "Organization Validation",
      status: "review_required",
      assignedTo: "Alice Johnson",
      progress: 80,
      nextStep: "Final review and approval",
      documents: ["Business Registration", "Tax ID Verification"],
      contact: "security@company.com",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_progress":
        return "text-blue-600"
      case "waiting_response":
        return "text-amber-600"
      case "review_required":
        return "text-orange-600"
      case "completed":
        return "text-emerald-600"
      default:
        return "text-slate-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {verificationMethods.map((method) => {
          const Icon = method.icon
          return (
            <Card key={method.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-cyan-600" />
                  <Badge variant="secondary">{method.active} active</Badge>
                </div>
                <CardTitle className="text-sm font-semibold text-slate-800">{method.name}</CardTitle>
                <CardDescription className="text-xs">{method.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Success Rate</span>
                    <span className="font-medium text-emerald-600">{method.success_rate}%</span>
                  </div>
                  <Progress value={method.success_rate} className="h-2" />
                  <div className="text-xs text-slate-500">{method.completed} completed this month</div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-black text-cyan-800">Pending Identity Verifications</CardTitle>
          <CardDescription>Active verification processes requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Verifications</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress</TabsTrigger>
              <TabsTrigger value="waiting_response">Waiting Response</TabsTrigger>
              <TabsTrigger value="review_required">Review Required</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {pendingVerifications.map((verification) => (
                <Card key={verification.id} className="border-l-4 border-l-cyan-500">
                  <CardContent className="pt-6">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{verification.id}</Badge>
                          <Badge className={getStatusColor(verification.status)}>
                            {verification.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-slate-900">{verification.subject}</h4>
                        <p className="text-sm text-slate-600">{verification.method}</p>
                        <p className="text-xs text-slate-500">Assigned to: {verification.assignedTo}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-700">Progress</span>
                          <span className="text-sm text-slate-600">{verification.progress}%</span>
                        </div>
                        <Progress value={verification.progress} className="h-2" />
                        <p className="text-xs text-slate-600">Next: {verification.nextStep}</p>
                        <div className="flex flex-wrap gap-1">
                          {verification.documents.map((doc) => (
                            <Badge key={doc} variant="secondary" className="text-xs">
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                          Review Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Contact Applicant
                        </Button>
                        {verification.status === "review_required" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-emerald-600 hover:text-emerald-700 bg-transparent"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
