"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Search, Edit, Trash2, Shield, Key, Users } from "lucide-react"

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  const users = [
    {
      id: "user-001",
      name: "Alice Johnson",
      email: "alice.johnson@company.com",
      role: "PKI Administrator",
      status: "active",
      lastLogin: "2024-01-15 14:32:15",
      permissions: ["manage_ca", "issue_certificates", "revoke_certificates", "manage_users"],
      createdAt: "2024-01-01",
      loginCount: 247,
    },
    {
      id: "user-002",
      name: "Bob Smith",
      email: "bob.smith@company.com",
      role: "RA Officer",
      status: "active",
      lastLogin: "2024-01-15 13:45:22",
      permissions: ["approve_requests", "verify_identity", "view_certificates"],
      createdAt: "2024-01-05",
      loginCount: 156,
    },
    {
      id: "user-003",
      name: "Carol Davis",
      email: "carol.davis@company.com",
      role: "Security Auditor",
      status: "active",
      lastLogin: "2024-01-15 09:15:33",
      permissions: ["view_audit_logs", "generate_reports", "view_certificates"],
      createdAt: "2024-01-10",
      loginCount: 89,
    },
    {
      id: "user-004",
      name: "David Wilson",
      email: "david.wilson@company.com",
      role: "Certificate Manager",
      status: "inactive",
      lastLogin: "2024-01-12 16:20:11",
      permissions: ["issue_certificates", "view_certificates", "manage_templates"],
      createdAt: "2024-01-08",
      loginCount: 134,
    },
  ]

  const roles = [
    {
      name: "PKI Administrator",
      description: "Full system access and management",
      permissions: ["manage_ca", "issue_certificates", "revoke_certificates", "manage_users", "system_settings"],
      userCount: 2,
      color: "bg-red-100 text-red-700",
    },
    {
      name: "RA Officer",
      description: "Registration Authority operations",
      permissions: ["approve_requests", "verify_identity", "view_certificates", "manage_requests"],
      userCount: 5,
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "Certificate Manager",
      description: "Certificate lifecycle management",
      permissions: ["issue_certificates", "view_certificates", "manage_templates"],
      userCount: 8,
      color: "bg-green-100 text-green-700",
    },
    {
      name: "Security Auditor",
      description: "Audit and compliance monitoring",
      permissions: ["view_audit_logs", "generate_reports", "view_certificates"],
      userCount: 3,
      color: "bg-purple-100 text-purple-700",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "inactive":
        return "secondary"
      case "suspended":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      {/* User Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Users</p>
                <p className="text-2xl font-bold text-slate-900">18</p>
              </div>
              <Users className="h-8 w-8 text-cyan-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Users</p>
                <p className="text-2xl font-bold text-slate-900">15</p>
              </div>
              <Shield className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Administrators</p>
                <p className="text-2xl font-bold text-slate-900">2</p>
              </div>
              <Key className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pending Invites</p>
                <p className="text-2xl font-bold text-slate-900">3</p>
              </div>
              <UserPlus className="h-8 w-8 text-slate-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading text-slate-800">User Management</CardTitle>
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="PKI Administrator">PKI Administrator</SelectItem>
                <SelectItem value="RA Officer">RA Officer</SelectItem>
                <SelectItem value="Certificate Manager">Certificate Manager</SelectItem>
                <SelectItem value="Security Auditor">Security Auditor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Login Count</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/abstract-geometric-shapes.png?height=32&width=32&query=${user.name}`} />
                        <AvatarFallback className="bg-cyan-100 text-cyan-700 text-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(user.status)} className="text-xs">
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{user.lastLogin}</TableCell>
                  <TableCell className="text-sm">{user.loginCount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Management */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-slate-800">Role Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {roles.map((role) => (
              <Card key={role.name} className="border hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-slate-900">{role.name}</h3>
                      <p className="text-sm text-slate-600">{role.description}</p>
                    </div>
                    <Badge className={`text-xs ${role.color}`}>{role.userCount} users</Badge>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Permissions:</span>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 3).map((permission) => (
                        <Badge key={permission} variant="secondary" className="text-xs">
                          {permission.replace("_", " ")}
                        </Badge>
                      ))}
                      {role.permissions.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{role.permissions.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
