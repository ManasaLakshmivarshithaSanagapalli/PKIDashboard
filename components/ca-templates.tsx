"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Eye, Edit, Copy, Trash2 } from "lucide-react"

export function CATemplates() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const templates = [
    {
      id: "tpl-001",
      name: "Root CA Template",
      description: "Template for creating root Certificate Authorities",
      type: "root_ca",
      keyAlgorithm: "RSA",
      keySize: 4096,
      validityPeriod: 3650,
      usage: ["cert_sign", "crl_sign"],
      createdAt: "2024-01-01",
      usageCount: 3,
    },
    {
      id: "tpl-002",
      name: "Intermediate CA Template",
      description: "Template for creating intermediate Certificate Authorities",
      type: "intermediate_ca",
      keyAlgorithm: "RSA",
      keySize: 3072,
      validityPeriod: 1825,
      usage: ["cert_sign", "crl_sign"],
      createdAt: "2024-01-01",
      usageCount: 9,
    },
    {
      id: "tpl-003",
      name: "TLS Issuing CA Template",
      description: "Specialized template for TLS certificate issuing CAs",
      type: "intermediate_ca",
      keyAlgorithm: "RSA",
      keySize: 2048,
      validityPeriod: 1095,
      usage: ["cert_sign", "crl_sign"],
      createdAt: "2024-01-15",
      usageCount: 2,
    },
    {
      id: "tpl-004",
      name: "Code Signing CA Template",
      description: "Template for code signing Certificate Authorities",
      type: "intermediate_ca",
      keyAlgorithm: "RSA",
      keySize: 3072,
      validityPeriod: 2190,
      usage: ["cert_sign", "crl_sign"],
      createdAt: "2024-01-10",
      usageCount: 1,
    },
  ]

  const getTypeBadge = (type: string) => {
    return (
      <Badge variant={type === "root_ca" ? "default" : "secondary"}>
        {type === "root_ca" ? "Root CA" : "Intermediate CA"}
      </Badge>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-black text-cyan-800">CA Templates</CardTitle>
            <CardDescription>Manage Certificate Authority templates for consistent CA creation</CardDescription>
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
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="root_ca">Root CA</SelectItem>
              <SelectItem value="intermediate_ca">Intermediate CA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Key Algorithm</TableHead>
                <TableHead>Validity Period</TableHead>
                <TableHead>Usage Count</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-slate-900">{template.name}</div>
                      <div className="text-sm text-slate-500">{template.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(template.type)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{template.keyAlgorithm}</div>
                      <div className="text-slate-500">{template.keySize} bits</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{Math.floor(template.validityPeriod / 365)} years</div>
                      <div className="text-slate-500">{template.validityPeriod} days</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{template.usageCount} CAs</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-500">
                    {new Date(template.createdAt).toLocaleDateString()}
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
      </CardContent>
    </Card>
  )
}
