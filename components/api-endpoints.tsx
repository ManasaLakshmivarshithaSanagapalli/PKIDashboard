"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Activity, CheckCircle, AlertCircle } from "lucide-react"

const endpoints = [
  {
    method: "GET",
    path: "/api/certificates",
    description: "List certificates with filtering",
    status: "active",
    requests: "2,847",
    avgResponse: "45ms",
  },
  {
    method: "POST",
    path: "/api/certificates",
    description: "Request new certificate",
    status: "active",
    requests: "1,234",
    avgResponse: "120ms",
  },
  {
    method: "GET",
    path: "/api/certificates/{id}",
    description: "Get certificate details",
    status: "active",
    requests: "5,678",
    avgResponse: "32ms",
  },
  {
    method: "DELETE",
    path: "/api/certificates/{id}",
    description: "Revoke certificate",
    status: "active",
    requests: "89",
    avgResponse: "78ms",
  },
  {
    method: "GET",
    path: "/api/ca",
    description: "List Certificate Authorities",
    status: "active",
    requests: "456",
    avgResponse: "28ms",
  },
  {
    method: "GET",
    path: "/api/requests",
    description: "List certificate requests",
    status: "active",
    requests: "1,567",
    avgResponse: "52ms",
  },
  {
    method: "POST",
    path: "/api/webhooks",
    description: "Register webhook endpoints",
    status: "active",
    requests: "234",
    avgResponse: "95ms",
  },
  {
    method: "GET",
    path: "/api/ocsp",
    description: "OCSP certificate status",
    status: "active",
    requests: "8,945",
    avgResponse: "18ms",
  },
]

const getMethodColor = (method: string) => {
  switch (method) {
    case "GET":
      return "bg-blue-100 text-blue-700"
    case "POST":
      return "bg-green-100 text-green-700"
    case "PUT":
      return "bg-yellow-100 text-yellow-700"
    case "DELETE":
      return "bg-red-100 text-red-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

export function APIEndpoints() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-slate-800 flex items-center gap-2">
          <Activity className="h-5 w-5 text-cyan-600" />
          API Endpoints
        </CardTitle>
        <Button variant="outline" size="sm">
          <ExternalLink className="h-4 w-4 mr-2" />
          View Docs
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {endpoints.map((endpoint, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Badge className={getMethodColor(endpoint.method)}>{endpoint.method}</Badge>
                <div>
                  <p className="font-medium text-slate-900">{endpoint.path}</p>
                  <p className="text-sm text-slate-600">{endpoint.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="text-center">
                  <p className="font-medium text-slate-900">{endpoint.requests}</p>
                  <p className="text-slate-500">requests</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-slate-900">{endpoint.avgResponse}</p>
                  <p className="text-slate-500">avg time</p>
                </div>
                <div className="flex items-center gap-1">
                  {endpoint.status === "active" ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
