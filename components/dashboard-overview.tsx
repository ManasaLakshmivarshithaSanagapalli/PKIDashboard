"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const certificateData = [
  { month: "Jan", issued: 245, revoked: 12 },
  { month: "Feb", issued: 289, revoked: 8 },
  { month: "Mar", issued: 312, revoked: 15 },
  { month: "Apr", issued: 278, revoked: 6 },
  { month: "May", issued: 334, revoked: 11 },
  { month: "Jun", issued: 298, revoked: 9 },
]

const certificateTypes = [
  { name: "TLS/SSL", value: 1247, color: "#0891b2" },
  { name: "Code Signing", value: 456, color: "#164e63" },
  { name: "Client Auth", value: 789, color: "#0e7490" },
  { name: "Email", value: 355, color: "#155e75" },
]

export function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Certificate Issuance Trends */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="font-heading text-slate-800">Certificate Issuance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={certificateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="issued" fill="#0891b2" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revoked" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Certificate Types Distribution */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="font-heading text-slate-800">Certificate Types</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={certificateTypes}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {certificateTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
