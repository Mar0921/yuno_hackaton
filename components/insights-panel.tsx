"use client"

import { Card } from "@/components/ui/card"
import { Sparkles, TrendingUp, Users, Clock } from "lucide-react"
import { AreaChart, Area, ResponsiveContainer } from "recharts"

const chartData = [
  { value: 20 },
  { value: 35 },
  { value: 25 },
  { value: 45 },
  { value: 40 },
  { value: 55 },
  { value: 50 },
]

const insights = [
  {
    id: 1,
    title: "Meeting increase",
    description: "34% more meetings this month vs. previous",
    trend: "up",
    icon: TrendingUp,
    color: "text-chart-3",
  },
  {
    id: 2,
    title: "Active clients",
    description: "15 clients with activity in last 7 days",
    trend: "neutral",
    icon: Users,
    color: "text-primary",
  },
  {
    id: 3,
    title: "Average time",
    description: "48 min per meeting (optimal)",
    trend: "neutral",
    icon: Clock,
    color: "text-muted-foreground",
  },
]

export function InsightsPanel() {
  return (
    <Card className="p-6 hover:border-primary hover:-translate-y-1 transition-all hover:shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold text-foreground">Insights</h2>
      </div>

      {/* Mini Chart */}
      <div className="mb-6 p-4 bg-secondary rounded-lg">
        <p className="text-sm font-medium text-foreground mb-2">Actividad del Cliente</p>
        <ResponsiveContainer width="100%" height={80}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorValue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Insights List */}
      <div className="space-y-4">
        {insights.map((insight) => {
          const Icon = insight.icon
          return (
            <div key={insight.id} className="flex items-start gap-3">
              <div className={`h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0`}>
                <Icon className={`h-5 w-5 ${insight.color}`} />
              </div>
              <div>
                <p className="font-medium text-sm text-foreground">{insight.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
