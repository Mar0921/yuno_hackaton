"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClientSearch } from "@/components/client-search"
import { SalesClientsDashboard } from "@/components/sales-clients-dashboard"
import { MeetingSummaries } from "@/components/meeting-summaries"
import { InsightsPanel } from "@/components/insights-panel"
import { HighlightsPanel } from "@/components/highlights-panel"
import { TechnicalSummaries } from "@/components/technical-summaries"
import { TrendingUp, DollarSign, Users, Target, BarChart3 } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const monthlyRevenue = [
  { month: "Ene", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Abr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
]

const salesByCategory = [
  { category: "Integraciones", count: 15 },
  { category: "Analytics", count: 12 },
  { category: "Automatización", count: 9 },
  { category: "CRM", count: 7 },
]

export function SalesDashboard({ userRole }: { userRole: "sales" | "technical" }) {
  const [view, setView] = useState<'dashboard' | 'clients'>('dashboard')

  if (view === 'clients') {
    return <SalesClientsDashboard onBack={() => setView('dashboard')} />
  }

  return (
    <div className={`min-h-screen ${userRole === "sales" ? "bg-[#e2e8f1]" : "bg-[#e8e2f1]"} transition-colors duration-500`}>
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full mb-6">
            <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground">Sales Dashboard</span>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
            Manage your clients and opportunities in one place
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Access AI-generated meeting summaries, relevant insights and automatically identified sales opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
          <Card className="p-6 border-border/50 hover:border-primary transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className={`h-5 w-5 ${userRole === "sales" ? "text-blue-500" : "text-purple-500"}`} />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">24</div>
            <p className="text-sm text-muted-foreground">Meetings this month</p>
          </Card>

          <Card className="p-6 border-border/50 hover:border-primary transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className={`h-5 w-5 ${userRole === "sales" ? "text-blue-500" : "text-purple-500"}`} />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-primary mb-1">12</div>
            <p className="text-sm text-muted-foreground">Active opportunities</p>
          </Card>

          <Card className="p-6 border-border/50 hover:border-primary transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BarChart3 className={`h-5 w-5 ${userRole === "sales" ? "text-blue-500" : "text-purple-500"}`} />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">8</div>
            <p className="text-sm text-muted-foreground">Pending priorities</p>
          </Card>

          <Card className="p-6 border-border/50 hover:border-primary transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className={`h-5 w-5 ${userRole === "sales" ? "text-blue-500" : "text-purple-500"}`} />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">$67K</div>
            <p className="text-sm text-muted-foreground">Revenue this month</p>
          </Card>

          <Card className="p-6 border-border/50 hover:border-primary transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className={`h-5 w-5 ${userRole === "sales" ? "text-blue-500" : "text-purple-500"}`} />
              </div>
            </div>
            <Button onClick={() => setView('clients')} className="w-full">
              Clients
            </Button>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="p-6 border-border/50 hover:-translate-y-1 transition-all hover:shadow-lg">
            <h3 className="text-lg font-semibold text-foreground mb-6">Monthly Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" vertical={false} />
                <XAxis
                  dataKey="month"
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
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--popover-foreground))",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  itemStyle={{ color: "hsl(var(--primary))" }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 2, stroke: "hsl(var(--background))" }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 border-border/50 hover:-translate-y-1 transition-all hover:shadow-lg">
            <h3 className="text-lg font-semibold text-foreground mb-6">Sales by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesByCategory}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" vertical={false} />
                <XAxis
                  dataKey="category"
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
                <Bar
                  dataKey="count"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="space-y-16">
          <MeetingSummaries />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <HighlightsPanel />
            <InsightsPanel />
          </div>

          <TechnicalSummaries />
        </div>
      </div>
    </div>
  )
}
