"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, Download, Filter, Calendar, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"

export function RequestHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const requests = [
    {
      id: "REQ-2024-001",
      subject: "CN=api.example.com, O=Example Corp, C=US",
      type: "TLS Server Certificate",
      status: "issued",
      submittedBy: "john.doe@example.com",
      submittedAt: "2024-01-15 10:30:00",
      processedAt: "2024-01-15 11:45:00",
      reviewedBy: "Alice Johnson",
      certificateId: "CERT-2024-001",
      validUntil: "2025-01-15",
    },
    {
      id: "REQ-2024-002",
      subject: "CN=John Doe, O=Acme Corp, C=US",
      type: "Client Authentication",
      status: "rejected",
      submittedBy: "jane.smith@acme.com",
      submittedAt: "2024-01-15 09:15:00",
      processedAt: "2024-01-15 14:20:00",
      reviewedBy: "Bob Smith",
      rejectionReason: "Invalid identity verification documents",
      certificateId: null,
      validUntil: null,
    },
    {
      id: "REQ-2024-003",
      subject: "CN=mail.company.com, O=Company Ltd, C=UK",
      type: "S/MIME Certificate",
      status: "issued",
      submittedBy: "admin@company.com",
      submittedAt: "2024-01-14 16:45:00",
      processedAt: "2024-01-15 08:30:00",
      reviewedBy: "Carol Davis",
      certificateId: "CERT-2024-002",
      validUntil: "2025-01-14",
    },
    {
      id: "REQ-2024-004",
      subject: "CN=CodeSigner, O=Software Inc, C=CA",
      type: "Code Signing Certificate",
      status: "cancelled",
      submittedBy: "dev@software.ca",
      submittedAt: "2024-01-14 11:20:00",
      processedAt: "2024-01-14 15:10:00",
      reviewedBy: "David Wilson",
      cancellationReason: "Requested by submitter",
      certificateId: null,
      validUntil: null,
    },
    {
      id: "REQ-2024-005",
      subject: "CN=test.internal.com, O=Internal Corp, C=US",
      type: "TLS Server Certificate",
      status: "expired_request",
      submittedBy: "test@internal.com",
      submittedAt: "2024-01-10 14:30:00",
      processedAt: null,
      reviewedBy: null,
      certificateId: null,
      validUntil: null,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "issued":
        return <CheckCircle className="h-4 w-4 text-emerald-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-orange-600" />
      case "expired_request":
        return <AlertTriangle className="h-4 w-4 text-amber-600" />
      default:
        return <Clock className="h-4 w-4 text-slate-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      issued: "default",
      rejected: "destructive",
      cancelled: "secondary",
      expired_request: "outline",
    } as const

    const labels = {
      issued: "Issued",
      rejected: "Rejected",
      cancelled: "Cancelled",
      expired_request: "Expired Request",
    }

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    )
  }

  const calculateProcessingTime = (submitted: string, processed: string | null) => {
    if (!processed) return "N/A"
    const submittedTime = new Date(submitted).getTime()
    const processedTime = new Date(processed).getTime()
    const diffHours = Math.round((processedTime - submittedTime) / (1000 * 60 * 60))
    return `${diffHours}h`
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-black text-cyan-800">Certificate Request History</CardTitle>
            <CardDescription>View and analyze historical certificate requests</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search request history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="issued">Issued</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="expired_request">Expired Request</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Processing Time</TableHead>
                <TableHead>Reviewed By</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={request.subject}>
                      {request.subject}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{request.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(request.status)}
                      {getStatusBadge(request.status)}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{request.submittedBy}</TableCell>
                  <TableCell className="text-sm">
                    {calculateProcessingTime(request.submittedAt, request.processedAt)}
                  </TableCell>
                  <TableCell className="text-sm">{request.reviewedBy || "N/A"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {request.certificateId && (
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <div>
                  <div className="text-lg font-bold text-slate-900">2</div>
                  <div className="text-xs text-slate-500">Issued</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <div>
                  <div className="text-lg font-bold text-slate-900">1</div>
                  <div className="text-xs text-slate-500">Rejected</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <XCircle className="h-4 w-4 text-orange-600" />
                <div>
                  <div className="text-lg font-bold text-slate-900">1</div>
                  <div className="text-xs text-slate-500">Cancelled</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <div>
                  <div className="text-lg font-bold text-slate-900">1</div>
                  <div className="text-xs text-slate-500">Expired</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-cyan-600" />
                <div>
                  <div className="text-lg font-bold text-slate-900">15h</div>
                  <div className="text-xs text-slate-500">Avg Processing</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
