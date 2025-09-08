"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Shield,
  BadgeIcon as Certificate,
  FileX,
  Server,
  Users,
  Settings,
  Activity,
  ChevronLeft,
  ChevronRight,
  Home,
  Key,
  AlertTriangle,
  Plus,
  Globe,
  Clock
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home, current: true },
  { name: "Certificate Authorities", href: "/ca", icon: Shield },
  { name: "Certificates", href: "/certificates", icon: Certificate },
  { name: "Issue Certificate", href: "/issue", icon: Plus },
  { name: "Certificate Requests", href: "/requests", icon: FileX },
  { name: "API Requests", href: "/api-requests", icon: Globe }, // Added API Requests navigation item
  { name: "CRL Management", href: "/crl", icon: AlertTriangle },
  { name: "OCSP Status", href: "/ocsp", icon: Server },
  { name: "HSM Integration", href: "/hsm", icon: Key },
  { name: "Registration Authority", href: "/ra", icon: Users },
  { name: "Audit Logs", href: "/audit", icon: Activity },
  { name: "Settings", href: "/settings", icon: Settings },
  {name:"TimeStamping Authority",href:"/tsa",icon:Clock}
]

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "bg-white border-r border-slate-200 transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-cyan-600" />
              <span className="text-xl font-black font-heading text-cyan-800">PKI</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-slate-500 hover:text-cyan-600"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium font-body transition-all duration-200",
                  "hover:bg-cyan-50 hover:text-cyan-700 hover:scale-105",
                  item.current ? "bg-cyan-100 text-cyan-700 shadow-sm" : "text-slate-600",
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User Info */}
        {!collapsed && (
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-cyan-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-cyan-700">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">Admin User</p>
                <p className="text-xs text-slate-500 truncate">admin@pki.local</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
