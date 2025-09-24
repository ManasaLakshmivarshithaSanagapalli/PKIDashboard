"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CertificateFilters({
  status,
  onStatusChange,
  searchTerm,
  onSearchChange,
}: {
  status: string
  onStatusChange: (s: string) => void
  searchTerm: string
  onSearchChange: (s: string) => void
}) {
  return (
    <Card>
      <CardContent className="p-4 flex flex-wrap items-center gap-4">
        <span className="text-sm font-medium text-slate-700">Status:</span>
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="revoked">Revoked</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Search with the serial number..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-64"
        />

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onStatusChange("all")
            onSearchChange("")
          }}
        >
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  )
}
