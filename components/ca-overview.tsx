"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, CheckCircle, AlertTriangle } from "lucide-react"

export function CAOverview() {
  const [issuers, setIssuers] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const[roots,setRoots]=useState<any[]>([])
  const[Count,setCount]=useState<number>(0)

  useEffect(() => {
    fetch("/api/issuers")
      .then((res) => res.json())
      .then((data) => {
        setIssuers(data.issuers || [])
        setTotalCount(data.totalCount || 0)
      })
  }, [])

    useEffect(() => {
    fetch("/api/root")
      .then((res) => res.json())
      .then((data) => {
        setRoots(data.roots || [])
        setCount(data.Count || 0)
      })
  }, [])

  const stats = [
    { title: "Total CAs", value: Count+totalCount, change: "All operational", icon: Shield, color: "text-cyan-600" },
    { title: "Root CAs", value: Count, change: "All operational", icon: CheckCircle, color: "text-blue-600" },
    { title: "Intermediate CAs", value: totalCount, change: "All operational", icon: CheckCircle, color: "text-blue-600" }
  ]

  return (
     <div className="space-y-8">
    {/* Overview Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                 <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
                 <Icon className={`h-5 w-5 ${stat.color}`} />
               </CardHeader>
               <CardContent>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                 <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
            

       )
     })}
    </div>
  
      {/* Issuers Table */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="font-heading text-slate-800">Intermediate CAs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Issuers ID</TableHead>
                  <TableHead>Issuer Name</TableHead>
                  <TableHead>Algorithm</TableHead>
                  <TableHead>Root ID</TableHead>
                  <TableHead>Valid From</TableHead>
                  <TableHead>Valid To</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issuers.map((issuer) => (
                  <TableRow key={issuer.issuer_id}>
                    <TableCell>{issuer.issuer_id}</TableCell>
                    <TableCell>{issuer.ocsp_responder_name}</TableCell>
                    <TableCell>{issuer.key_type}</TableCell>
                    <TableCell>{issuer.root_id}</TableCell>
                    <TableCell>{new Date(issuer.valid_from).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(issuer.valid_to).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="font-heading text-slate-800">Root CAs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Root ID</TableHead>
                  <TableHead>Root Name</TableHead>
                  <TableHead>Algorithm</TableHead>
                  <TableHead>Valid From</TableHead>
                  <TableHead>Valid To</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roots.map((root) => (
                  <TableRow key={root.root_id}>
                    <TableCell>{root.root_id}</TableCell>
                 <TableCell>
  {root.root_name?.split(",").find((part: string) => part.trim().startsWith("CN="))?.replace("CN=", "").trim()}
</TableCell>
                    <TableCell>{root.key_type}</TableCell>
                    <TableCell>{new Date(root.valid_from).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(root.valid_to).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table> 
            
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
