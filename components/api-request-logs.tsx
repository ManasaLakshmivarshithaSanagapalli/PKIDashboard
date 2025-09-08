"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, Search, Download } from "lucide-react"

const requestLogs = [
  {
    id: "1",
    timestamp: "2024-01-15 16:45:23",
    method: "GET",
    endpoint: "/api/certificates",
    clientId: "prod-client-001",
    status: 200,
    responseTime: "45ms",
    ipAddress: "192.168.1.100",
  },
  {
    id: "2",
    timestamp: "2024-01-15 16:44:18",
    method: "POST",
    endpoint: "/api/certificates",
    clientId: "mobile-client-003",
    status: 201,
    responseTime: "120ms",
    ipAddress: "10.0.0.50",
  },
  {
    id: "3",
    timestamp: "2024-01-15 16:43:45",
    method: "GET",
    endpoint: "/api/certificates/cert-123",
    clientId: "test-client-002",
    status: 200,
    responseTime: "32ms",
    ipAddress: "172.16.0.25",
  },
  {
    id: "4",
    timestamp: "2024-01-15 16:42:12",
    method: "DELETE",
    endpoint: "/api/certificates/cert-456",
    clientId: "prod-client-001",
    status: 200,
    responseTime: "78ms",
    ipAddress: "192.168.1.100",
  },
  {
    id: "5",
    timestamp: "2024-01-15 16:41:33",
    method: "GET",
    endpoint: "/api/ca",
    clientId: "mobile-client-003",
    status: 200,
    responseTime: "28ms",
    ipAddress: "10.0.0.50",
  },
]

const getStatusColor = (status: number) => {
  if (status >= 200 && status < 300) return "bg-green-100 text-green-700"
  if (status >= 400 && status < 500) return "bg-yellow-100 text-yellow-700"
  if (status >= 500) return "bg-red-100 text-red-700"
  return "bg-gray-100 text-gray-700"
}

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

export function APIRequestLogs() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-slate-800 flex items-center gap-2">
          <Activity className="h-5 w-5 text-cyan-600" />
          Recent API Requests
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-slate-500" />
            <Input placeholder="Search logs..." className="w-48" />
          </div>
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="200">Success</SelectItem>
              <SelectItem value="400">Client Error</SelectItem>
              <SelectItem value="500">Server Error</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-medium text-slate-700">Timestamp</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Method</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Endpoint</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Client</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Response Time</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {requestLogs.map((log) => (
                <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-sm text-slate-600">{log.timestamp}</td>
                  <td className="py-3 px-4">
                    <Badge className={getMethodColor(log.method)}>{log.method}</Badge>
                  </td>
                  <td className="py-3 px-4 text-sm font-mono text-slate-700">{log.endpoint}</td>
                  <td className="py-3 px-4 text-sm text-slate-600">{log.clientId}</td>
                  <td className="py-3 px-4">
                    <Badge className={getStatusColor(log.status)}>{log.status}</Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">{log.responseTime}</td>
                  <td className="py-3 px-4 text-sm font-mono text-slate-600">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
