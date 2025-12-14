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
  { name: "Lun", cambios: 12, errores: 2, mejoras: 8 },
  { name: "Mar", cambios: 15, errores: 1, mejoras: 11 },
  { name: "Mié", cambios: 8, errores: 3, mejoras: 5 },
  { name: "Jue", cambios: 18, errores: 1, mejoras: 14 },
  { name: "Vie", cambios: 14, errores: 2, mejoras: 9 },
  { name: "Sáb", cambios: 5, errores: 0, mejoras: 4 },
  { name: "Dom", cambios: 3, errores: 0, mejoras: 2 },
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
          <h3 className="text-lg font-semibold text-foreground">Actividad Semanal</h3>
          <p className="text-sm text-muted-foreground mt-1">Cambios, errores y mejoras por día</p>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="name" className="text-xs" tick={{ fill: "#000000" }} />
            <YAxis className="text-xs" tick={{ fill: "#000000" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "#000000",
              }}
            />
            <Legend />
            <Bar dataKey="cambios" fill="#6366f1" name="Cambios" radius={[4, 4, 0, 0]} />
            <Bar dataKey="errores" fill="#ef4444" name="Errores" radius={[4, 4, 0, 0]} />
            <Bar dataKey="mejoras" fill="#10b981" name="Mejoras" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Performance Chart */}
      <Card className="p-6 hover:border-primary hover:-translate-y-1 transition-all hover:shadow-lg">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Rendimiento del Sistema</h3>
          <p className="text-sm text-muted-foreground mt-1">Tiempo de respuesta (ms) y uptime (%)</p>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="name" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <YAxis
              yAxisId="left"
              className="text-xs"
              tick={{ fill: "#000000" }}
              label={{ value: "ms", position: "insideLeft" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              className="text-xs"
              tick={{ fill: "#000000" }}
              domain={[98, 100]}
              label={{ value: "%", position: "insideRight" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="responseTime"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              name="Tiempo Respuesta"
              dot={{ fill: "hsl(var(--primary))" }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="uptime"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              name="Uptime"
              dot={{ fill: "hsl(var(--chart-3))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
