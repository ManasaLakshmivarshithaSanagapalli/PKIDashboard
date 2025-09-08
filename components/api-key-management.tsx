"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Key, Plus, Copy, Trash2, Eye, EyeOff } from "lucide-react"

const apiKeys = [
  {
    id: "1",
    name: "Production App",
    clientId: "prod-client-001",
    key: "pk_live_1234567890abcdef",
    permissions: ["certificate:read", "certificate:create"],
    rateLimit: 1000,
    lastUsed: "2024-01-15 14:30",
    status: "active",
    requests: "2,847",
  },
  {
    id: "2",
    name: "Test Environment",
    clientId: "test-client-002",
    key: "pk_test_abcdef1234567890",
    permissions: ["certificate:read"],
    rateLimit: 500,
    lastUsed: "2024-01-14 09:15",
    status: "active",
    requests: "456",
  },
  {
    id: "3",
    name: "Mobile App",
    clientId: "mobile-client-003",
    key: "pk_live_fedcba0987654321",
    permissions: ["certificate:read", "certificate:create", "certificate:revoke"],
    rateLimit: 2000,
    lastUsed: "2024-01-15 16:45",
    status: "active",
    requests: "5,234",
  },
]

export function APIKeyManagement() {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys((prev) => ({ ...prev, [keyId]: !prev[keyId] }))
  }

  const maskKey = (key: string) => {
    return key.substring(0, 8) + "..." + key.substring(key.length - 4)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-slate-800 flex items-center gap-2">
          <Key className="h-5 w-5 text-cyan-600" />
          API Key Management
        </CardTitle>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
              <Plus className="h-4 w-4 mr-2" />
              Generate Key
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Generate New API Key</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keyName">Application Name</Label>
                <Input id="keyName" placeholder="Enter application name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="permissions">Permissions</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select permissions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="read">Read Only</SelectItem>
                    <SelectItem value="read-write">Read & Write</SelectItem>
                    <SelectItem value="full">Full Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rateLimit">Rate Limit (requests/hour)</Label>
                <Input id="rateLimit" type="number" defaultValue="1000" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-cyan-600 hover:bg-cyan-700">Generate Key</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div
              key={apiKey.id}
              className="p-4 border border-slate-200 rounded-lg hover:border-cyan-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-slate-900">{apiKey.name}</h4>
                  <p className="text-sm text-slate-600">Client ID: {apiKey.clientId}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={apiKey.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                  >
                    {apiKey.status}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={() => toggleKeyVisibility(apiKey.id)}>
                    {showKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Key:</span>
                  <code className="text-sm bg-slate-100 px-2 py-1 rounded">
                    {showKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                  </code>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-slate-600">Permissions: {apiKey.permissions.join(", ")}</span>
                    <span className="text-slate-600">Rate Limit: {apiKey.rateLimit}/hour</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-600">Requests: {apiKey.requests}</span>
                    <span className="text-slate-600">Last Used: {apiKey.lastUsed}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
