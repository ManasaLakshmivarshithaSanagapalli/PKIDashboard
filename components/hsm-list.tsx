"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Settings, TestTube, Key, AlertCircle, CheckCircle, Clock } from "lucide-react"

// Mock HSM data
const hsmConfigurations = [
  {
    id: "hsm-001",
    name: "Production HSM",
    type: "PKCS#11",
    status: "healthy",
    connection: "Connected",
    slot: "0",
    tokenLabel: "PROD-TOKEN-01",
    keyCount: 45,
    lastHealthCheck: "2 min ago",
    operations24h: 1247,
  },
  {
    id: "hsm-002",
    name: "Azure Key Vault",
    type: "Azure KV",
    status: "healthy",
    connection: "Connected",
    slot: "-",
    tokenLabel: "pki-keyvault",
    keyCount: 23,
    lastHealthCheck: "1 min ago",
    operations24h: 892,
  },
  {
    id: "hsm-003",
    name: "Development HSM",
    type: "Software",
    status: "warning",
    connection: "Connected",
    slot: "1",
    tokenLabel: "DEV-TOKEN-01",
    keyCount: 12,
    lastHealthCheck: "5 min ago",
    operations24h: 156,
  },
  {
    id: "hsm-004",
    name: "Backup HSM",
    type: "PKCS#11",
    status: "error",
    connection: "Disconnected",
    slot: "2",
    tokenLabel: "BACKUP-TOKEN",
    keyCount: 0,
    lastHealthCheck: "2 hours ago",
    operations24h: 0,
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
      return <AlertCircle className="h-4 w-4 text-red-600" />
    default:
      return null
  }
}

export function HSMList() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="font-heading text-slate-800">HSM Configurations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Keys</TableHead>
                <TableHead>Operations</TableHead>
                <TableHead>Last Check</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hsmConfigurations.map((hsm) => (
                <TableRow key={hsm.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(hsm.status)}
                      <div>
                        <span className="font-medium font-body">{hsm.name}</span>
                        <p className="text-xs text-slate-500">{hsm.tokenLabel}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{hsm.type}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(hsm.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Key className="h-4 w-4 text-slate-400" />
                      <span>{hsm.keyCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>{hsm.operations24h.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={hsm.status === "error" ? "text-red-600" : "text-slate-600"}>
                      {hsm.lastHealthCheck}
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
                          Test Connection
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Key className="h-4 w-4 mr-2" />
                          Manage Keys
                        </DropdownMenuItem>
                        {hsm.status === "error" && (
                          <DropdownMenuItem className="text-red-600">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Troubleshoot
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
