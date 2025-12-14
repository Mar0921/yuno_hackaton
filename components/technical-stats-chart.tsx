"use client"

import { Card } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const activityData = [
  { name: "Mon", changes: 12, errors: 2, improvements: 8 },
  { name: "Tue", changes: 15, errors: 1, improvements: 11 },
  { name: "Wed", changes: 8, errors: 3, improvements: 5 },
  { name: "Thu", changes: 18, errors: 1, improvements: 14 },
  { name: "Fri", changes: 14, errors: 2, improvements: 9 },
  { name: "Sat", changes: 5, errors: 0, improvements: 4 },
  { name: "Sun", changes: 3, errors: 0, improvements: 2 },
]

const performanceData = [
  { name: "Sem 1", responseTime: 240, uptime: 99.2 },
  { name: "Sem 2", responseTime: 220, uptime: 99.5 },
  { name: "Sem 3", responseTime: 180, uptime: 99.7 },
  { name: "Sem 4", responseTime: 150, uptime: 99.9 },
]

export function TechnicalStatsChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Activity Chart */}
      <Card className="p-6 hover:border-primary hover:-translate-y-1 transition-all hover:shadow-lg">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Weekly Activity</h3>
          <p className="text-sm text-muted-foreground mt-1">Changes, errors and improvements per day</p>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              cursor={{ fill: "hsl(var(--muted)/0.4)" }}
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--popover-foreground))",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Bar dataKey="changes" fill="hsl(var(--primary))" name="Changes" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="errors" fill="hsl(var(--destructive))" name="Errors" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="improvements" fill="hsl(var(--chart-2))" name="Improvements" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Performance Chart */}
      <Card className="p-6 hover:border-primary hover:-translate-y-1 transition-all hover:shadow-lg">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">System Performance</h3>
          <p className="text-sm text-muted-foreground mt-1">Response time (ms) and uptime (%)</p>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="left"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{ value: "ms", position: "insideLeft", fill: "#888888" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[98, 100]}
              label={{ value: "%", position: "insideRight", fill: "#888888" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--popover-foreground))",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="responseTime"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              name="Response Time"
              dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 2, stroke: "hsl(var(--background))" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="uptime"
              stroke="hsl(var(--chart-3))"
              strokeWidth={3}
              name="Uptime"
              dot={{ r: 4, fill: "hsl(var(--chart-3))", strokeWidth: 2, stroke: "hsl(var(--background))" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
