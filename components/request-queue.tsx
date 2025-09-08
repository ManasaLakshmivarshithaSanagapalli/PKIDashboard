"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"

export function RequestQueue() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const requests = [
    {
      id: "REQ-2024-001",
      subject: "CN=John Doe, O=Acme Corp, C=US",
      type: "SSL Certificate",
      status: "pending_review",
      priority: "high",
      submittedBy: "john.doe@acme.com",
      submittedAt: "2024-01-15 10:30:00",
      assignedTo: "Alice Johnson",
      validationMethod: "Domain Validation",
    },
    {
      id: "REQ-2024-002",
      subject: "CN=api.example.com, O=Example Inc, C=US",
      type: "Code Signing",
      status: "identity_verification",
      priority: "medium",
      submittedBy: "admin@example.com",
      submittedAt: "2024-01-15 09:15:00",
      assignedTo: "Bob Smith",
      validationMethod: "Extended Validation",
    },
    {
      id: "REQ-2024-003",
      subject: "CN=Jane Smith, O=Tech Solutions, C=CA",
      type: "Client Certificate",
      status: "approved",
      priority: "low",
      submittedBy: "jane.smith@techsol.ca",
      submittedAt: "2024-01-15 08:45:00",
      assignedTo: "Carol Davis",
      validationMethod: "Organization Validation",
    },
    {
      id: "REQ-2024-004",
      subject: "CN=mail.company.com, O=Company Ltd, C=UK",
      type: "S/MIME Certificate",
      status: "rejected",
      priority: "medium",
      submittedBy: "it@company.com",
      submittedAt: "2024-01-15 07:20:00",
      assignedTo: "David Wilson",
      validationMethod: "Domain Validation",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending_review":
        return <Clock className="h-4 w-4 text-amber-600" />
      case "identity_verification":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case "approved":
        return <CheckCircle className="h-4 w-4 text-emerald-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-slate-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending_review: "secondary",
      identity_verification: "outline",
      approved: "default",
      rejected: "destructive",
    } as const

    const labels = {
      pending_review: "Pending Review",
      identity_verification: "Identity Verification",
      approved: "Approved",
      rejected: "Rejected",
    }

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    )
  }

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-amber-100 text-amber-800",
      low: "bg-emerald-100 text-emerald-800",
    }

    return (
      <Badge className={colors[priority as keyof typeof colors] || "bg-slate-100 text-slate-800"}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-black text-cyan-800">Certificate Request Queue</CardTitle>
        <CardDescription>Review and process certificate requests</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search requests..."
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
              <SelectItem value="pending_review">Pending Review</SelectItem>
              <SelectItem value="identity_verification">Identity Verification</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
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
                <TableHead>Priority</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell className="max-w-xs truncate" title={request.subject}>
                    {request.subject}
                  </TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(request.status)}
                      {getStatusBadge(request.status)}
                    </div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                  <TableCell>{request.assignedTo}</TableCell>
                  <TableCell className="text-sm text-slate-500">
                    {new Date(request.submittedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {request.status === "pending_review" && (
                        <>
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
                        </>
                      )}
                    </div>
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
