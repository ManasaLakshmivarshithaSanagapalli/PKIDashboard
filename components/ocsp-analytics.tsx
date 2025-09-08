"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const requestData = [
  { hour: "00:00", requests: 1247, good: 1198, revoked: 49 },
  { hour: "04:00", requests: 892, good: 856, revoked: 36 },
  { hour: "08:00", requests: 2156, good: 2089, revoked: 67 },
  { hour: "12:00", requests: 3247, good: 3134, revoked: 113 },
  { hour: "16:00", requests: 2891, good: 2798, revoked: 93 },
  { hour: "20:00", requests: 1654, good: 1598, revoked: 56 },
]

const responseTimeData = [
  { time: "00:00", responseTime: 42 },
  { time: "04:00", responseTime: 38 },
  { time: "08:00", responseTime: 45 },
  { time: "12:00", responseTime: 52 },
  { time: "16:00", responseTime: 48 },
  { time: "20:00", responseTime: 41 },
]

export function OCSPAnalytics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Request Volume */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="font-heading text-slate-800">Request Volume (24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={requestData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="hour" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="good" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
              <Bar dataKey="revoked" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Response Time */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="font-heading text-slate-800">Response Time Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="responseTime"
                stroke="#0891b2"
                strokeWidth={3}
                dot={{ fill: "#0891b2", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
