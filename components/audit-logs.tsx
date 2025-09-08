"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Eye, Calendar } from "lucide-react"

export function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAction, setFilterAction] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const auditLogs = [
    {
      id: "audit-001",
      timestamp: "2024-01-15 14:32:15",
      user: "alice.johnson@company.com",
      action: "certificate_issued",
      resource_type: "certificate",
      resource_id: "cert-12345",
      details: { common_name: "api.example.com", ca: "Production CA" },
      ip_address: "192.168.1.100",
      user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      success: true,
      severity: "info",
    },
    {
      id: "audit-002",
      timestamp: "2024-01-15 14:28:42",
      user: "bob.smith@company.com",
      action: "certificate_revoked",
      resource_type: "certificate",
      resource_id: "cert-11234",
      details: { reason: "key_compromise", serial_number: "1A2B3C4D" },
      ip_address: "192.168.1.101",
      user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      success: true,
      severity: "warning",
    },
    {
      id: "audit-003",
      timestamp: "2024-01-15 14:25:18",
      user: "system",
      action: "crl_generated",
      resource_type: "crl",
      resource_id: "crl-789",
      details: { ca: "Production CA", revoked_count: 127 },
      ip_address: "127.0.0.1",
      user_agent: "PKI-System/1.0",
      success: true,
      severity: "info",
    },
    {
      id: "audit-004",
      timestamp: "2024-01-15 14:20:33",
      user: "unknown@example.com",
      action: "login_failed",
      resource_type: "auth",
      resource_id: null,
      details: { reason: "invalid_credentials", attempts: 3 },
      ip_address: "203.0.113.45",
      user_agent: "curl/7.68.0",
      success: false,
      severity: "error",
    },
    {
      id: "audit-005",
      timestamp: "2024-01-15 14:15:07",
      user: "carol.davis@company.com",
      action: "hsm_key_generated",
      resource_type: "hsm_key",
      resource_id: "key-567",
      details: { algorithm: "RSA", key_size: 2048, hsm: "Production HSM" },
      ip_address: "192.168.1.102",
      user_agent: "Mozilla/5.0 (X11; Linux x86_64)",
      success: true,
      severity: "info",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error":
        return "destructive"
      case "warning":
        return "secondary"
      case "info":
        return "default"
      default:
        return "default"
    }
  }

  const getActionLabel = (action: string) => {
    return action.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-slate-800">Filter Audit Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterAction} onValueChange={setFilterAction}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="certificate_issued">Certificate Issued</SelectItem>
                <SelectItem value="certificate_revoked">Certificate Revoked</SelectItem>
                <SelectItem value="crl_generated">CRL Generated</SelectItem>
                <SelectItem value="login_failed">Login Failed</SelectItem>
                <SelectItem value="hsm_key_generated">HSM Key Generated</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-slate-800">Audit Trail</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id} className="hover:bg-slate-50">
                  <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-sm">{log.user}</div>
                      <div className="text-xs text-slate-500 truncate max-w-[200px]" title={log.user_agent}>
                        {log.user_agent}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getSeverityColor(log.severity)} className="text-xs">
                      {getActionLabel(log.action)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{log.resource_type}</div>
                      {log.resource_id && <div className="text-xs text-slate-500 font-mono">{log.resource_id}</div>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={log.success ? "default" : "destructive"} className="text-xs">
                      {log.success ? "Success" : "Failed"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{log.ip_address}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
