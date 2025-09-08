"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export function CertificateFilters() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-700 font-body">Status:</span>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expiring">Expiring</SelectItem>
                <SelectItem value="revoked">Revoked</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-700 font-body">Type:</span>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="tls">TLS Server</SelectItem>
                <SelectItem value="client">Client Auth</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="code">Code Signing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-700 font-body">Issuer:</span>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All CAs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All CAs</SelectItem>
                <SelectItem value="root">Root CA</SelectItem>
                <SelectItem value="intermediate">Intermediate CA</SelectItem>
                <SelectItem value="email">Email CA</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="sm">
            Clear Filters
          </Button>
        </div>

        {/* Active Filters */}
        <div className="flex items-center space-x-2 mt-3">
          <Badge variant="secondary" className="flex items-center space-x-1">
            <span>Status: Active</span>
            <X className="h-3 w-3 cursor-pointer" />
          </Badge>
          <Badge variant="secondary" className="flex items-center space-x-1">
            <span>Type: TLS Server</span>
            <X className="h-3 w-3 cursor-pointer" />
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
