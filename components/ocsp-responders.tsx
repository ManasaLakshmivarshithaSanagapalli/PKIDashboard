"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Settings, TestTube, Pause, Play, CheckCircle, AlertTriangle, Clock } from "lucide-react"

// Mock OCSP responder data
const responders = [
  {
    id: "ocsp-001",
    name: "Primary OCSP Responder",
    url: "http://ocsp.example.com",
    ca: "Root CA",
    status: "healthy",
    requestsPerHour: 8247,
    avgResponseTime: "42ms",
    uptime: 99.9,
    lastCheck: "1 min ago",
    signingCert: "OCSP Signing Cert #1",
  },
  {
    id: "ocsp-002",
    name: "Secondary OCSP Responder",
    url: "http://ocsp2.example.com",
    ca: "Intermediate CA",
    status: "healthy",
    requestsPerHour: 3456,
    avgResponseTime: "38ms",
    uptime: 99.7,
    lastCheck: "2 min ago",
    signingCert: "OCSP Signing Cert #2",
  },
  {
    id: "ocsp-003",
    name: "Email CA OCSP",
    url: "http://email-ocsp.example.com",
    ca: "Email CA",
    status: "warning",
    requestsPerHour: 892,
    avgResponseTime: "156ms",
    uptime: 97.2,
    lastCheck: "5 min ago",
    signingCert: "Email OCSP Signing Cert",
  },
  {
    id: "ocsp-004",
    name: "Backup OCSP Responder",
    url: "http://backup-ocsp.example.com",
    ca: "Root CA",
    status: "error",
    requestsPerHour: 0,
    avgResponseTime: "timeout",
    uptime: 0,
    lastCheck: "1 hour ago",
    signingCert: "Backup OCSP Signing Cert",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "healthy":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Healthy</Badge>
    case "warning":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Warning</Badge>
    case "error":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Error</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "healthy":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "warning":
      return <Clock className="h-4 w-4 text-amber-600" />
    case "error":
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    default:
      return null
  }
}

export function OCSPResponders() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="font-heading text-slate-800">OCSP Responders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>CA</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requests/Hour</TableHead>
                <TableHead>Response Time</TableHead>
                <TableHead>Uptime</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {responders.map((responder) => (
                <TableRow key={responder.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(responder.status)}
                      <div>
                        <span className="font-medium font-body">{responder.name}</span>
                        <p className="text-xs text-slate-500 font-mono">{responder.url}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{responder.ca}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(responder.status)}</TableCell>
                  <TableCell>
                    <span className={responder.requestsPerHour > 0 ? "text-slate-900" : "text-slate-400"}>
                      {responder.requestsPerHour.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={responder.avgResponseTime === "timeout" ? "text-red-600" : "text-slate-900"}>
                      {responder.avgResponseTime}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={responder.uptime < 98 ? "text-red-600" : "text-green-600"}>
                      {responder.uptime}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <TestTube className="h-4 w-4 mr-2" />
                          Test Responder
                        </DropdownMenuItem>
                        {responder.status === "error" ? (
                          <DropdownMenuItem>
                            <Play className="h-4 w-4 mr-2" />
                            Start
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>
                            <Pause className="h-4 w-4 mr-2" />
                            Stop
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
