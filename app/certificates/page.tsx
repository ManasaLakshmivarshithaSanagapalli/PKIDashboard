"use client"

import { useState } from "react"
import { CertificateList } from "@/components/certificate-list"
import { CertificateFilters } from "@/components/certificate-filters"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function CertificatesPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="flex h-screen">
      <DashboardSidebar />

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          <CertificateFilters
            status={statusFilter}
            onStatusChange={setStatusFilter}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <CertificateList statusFilter={statusFilter} searchTerm={searchTerm} />
        </div>
      </main>
    </div>
  )
}

