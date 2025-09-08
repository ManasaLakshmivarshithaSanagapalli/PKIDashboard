"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Eye, Edit, Copy, Trash2, Shield } from "lucide-react"

export function RequestTemplates() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const templates = [
    {
      id: "req-tpl-001",
      name: "TLS Server Certificate",
      description: "Template for TLS/SSL server certificates",
      certificateType: "end_entity",
      keyAlgorithm: "RSA",
      keySize: 2048,
      validityPeriod: 365,
      keyUsage: ["digital_signature", "key_encipherment"],
      extendedKeyUsage: ["server_auth"],
      requiresApproval: true,
      autoRenewal: false,
      usageCount: 1247,
      createdAt: "2024-01-01",
    },
    {
      id: "req-tpl-002",
      name: "Client Authentication Certificate",
      description: "Template for client authentication certificates",
      certificateType: "end_entity",
      keyAlgorithm: "RSA",
      keySize: 2048,
      validityPeriod: 365,
      keyUsage: ["digital_signature"],
      extendedKeyUsage: ["client_auth"],
      requiresApproval: true,
      autoRenewal: false,
      usageCount: 89,
      createdAt: "2024-01-01",
    },
    {
      id: "req-tpl-003",
      name: "Code Signing Certificate",
      description: "Template for code signing certificates",
      certificateType: "end_entity",
      keyAlgorithm: "RSA",
      keySize: 3072,
      validityPeriod: 1095,
      keyUsage: ["digital_signature"],
      extendedKeyUsage: ["code_signing"],
      requiresApproval: true,
      autoRenewal: false,
      usageCount: 23,
      createdAt: "2024-01-01",
    },
    {
      id: "req-tpl-004",
      name: "S/MIME Email Certificate",
      description: "Template for S/MIME email certificates",
      certificateType: "end_entity",
      keyAlgorithm: "RSA",
      keySize: 2048,
      validityPeriod: 365,
      keyUsage: ["digital_signature", "key_encipherment"],
      extendedKeyUsage: ["email_protection"],
      requiresApproval: true,
      autoRenewal: true,
      usageCount: 156,
      createdAt: "2024-01-05",
    },
  ]

  const getCertificateTypeBadge = (type: string) => {
    return <Badge variant="outline">End Entity</Badge>
  }

  const getApprovalBadge = (requiresApproval: boolean) => {
    return (
      <Badge variant={requiresApproval ? "secondary" : "default"}>
        {requiresApproval ? "Manual Approval" : "Auto Approve"}
      </Badge>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-black text-cyan-800">Certificate Request Templates</CardTitle>
            <CardDescription>Manage templates for certificate requests to ensure consistency</CardDescription>
          </div>
          <Button className="bg-cyan-600 hover:bg-cyan-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search request templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by usage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Templates</SelectItem>
              <SelectItem value="server_auth">Server Authentication</SelectItem>
              <SelectItem value="client_auth">Client Authentication</SelectItem>
              <SelectItem value="code_signing">Code Signing</SelectItem>
              <SelectItem value="email_protection">Email Protection</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>Certificate Type</TableHead>
                <TableHead>Key Algorithm</TableHead>
                <TableHead>Validity</TableHead>
                <TableHead>Approval</TableHead>
                <TableHead>Usage Count</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Shield className="h-4 w-4 text-cyan-600" />
                      <div>
                        <div className="font-medium text-slate-900">{template.name}</div>
                        <div className="text-sm text-slate-500">{template.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getCertificateTypeBadge(template.certificateType)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{template.keyAlgorithm}</div>
                      <div className="text-slate-500">{template.keySize} bits</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>
                        {Math.floor(template.validityPeriod / 365)} year{template.validityPeriod > 365 ? "s" : ""}
                      </div>
                      <div className="text-slate-500">{template.validityPeriod} days</div>
                    </div>
                  </TableCell>
                  <TableCell>{getApprovalBadge(template.requiresApproval)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{template.usageCount.toLocaleString()}</div>
                      <div className="text-slate-500">certificates</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Template Usage Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-slate-900">4</div>
              <div className="text-sm text-slate-500">Active Templates</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-slate-900">1,515</div>
              <div className="text-sm text-slate-500">Total Requests</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-slate-900">1,247</div>
              <div className="text-sm text-slate-500">Most Used Template</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-slate-900">98.5%</div>
              <div className="text-sm text-slate-500">Success Rate</div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
