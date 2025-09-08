"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Eye, Settings } from "lucide-react"

export function CAHierarchy() {
  const hierarchy = [
    {
      id: "root-001",
      name: "Production Root CA",
      type: "root_ca",
      status: "active",
      level: 0,
      children: [
        {
          id: "int-001",
          name: "TLS Issuing CA",
          type: "intermediate_ca",
          status: "active",
          level: 1,
          issuedCerts: 1247,
          children: [],
        },
        {
          id: "int-002",
          name: "Email CA",
          type: "intermediate_ca",
          status: "active",
          level: 1,
          issuedCerts: 89,
          children: [],
        },
        {
          id: "int-003",
          name: "Code Signing CA",
          type: "intermediate_ca",
          status: "expiring_soon",
          level: 1,
          issuedCerts: 23,
          children: [],
        },
      ],
    },
    {
      id: "root-002",
      name: "Development Root CA",
      type: "root_ca",
      status: "active",
      level: 0,
      children: [
        {
          id: "int-004",
          name: "Dev TLS CA",
          type: "intermediate_ca",
          status: "active",
          level: 1,
          issuedCerts: 45,
          children: [],
        },
      ],
    },
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      expiring_soon: "secondary",
      expired: "destructive",
      revoked: "destructive",
    } as const

    return <Badge variant={variants[status as keyof typeof variants] || "secondary"}>{status.replace("_", " ")}</Badge>
  }

  const renderCA = (ca: any, isLast = false) => (
    <div key={ca.id} className="space-y-4">
      <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg border-l-4 border-cyan-500">
        <div className="flex items-center space-x-2">
          <Shield className={`h-5 w-5 ${ca.type === "root_ca" ? "text-emerald-600" : "text-blue-600"}`} />
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h3 className="font-semibold text-slate-900">{ca.name}</h3>
              {getStatusBadge(ca.status)}
              <Badge variant="outline">{ca.type === "root_ca" ? "Root CA" : "Intermediate CA"}</Badge>
            </div>
            {ca.issuedCerts && <p className="text-sm text-slate-500 mt-1">{ca.issuedCerts} certificates issued</p>}
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {ca.children && ca.children.length > 0 && (
        <div className="ml-8 space-y-4">
          {ca.children.map((child: any, index: number) => (
            <div key={child.id} className="relative">
              <div className="absolute -left-4 top-6 w-4 h-px bg-slate-300"></div>
              <div className="absolute -left-4 top-0 w-px h-6 bg-slate-300"></div>
              {index === ca.children.length - 1 && <div className="absolute -left-4 top-6 w-px h-full bg-white"></div>}
              {renderCA(child, index === ca.children.length - 1)}
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-black text-cyan-800">CA Hierarchy</CardTitle>
        <CardDescription>View the hierarchical structure of your Certificate Authorities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">{hierarchy.map((rootCA) => renderCA(rootCA))}</CardContent>
    </Card>
  )
}
