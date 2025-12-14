"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, TrendingUp } from "lucide-react"

const contractualItems = [
  {
    id: 1,
    title: "24/7 Support",
    description: "Guaranteed in contract until Dec 2024",
    priority: "high",
    type: "contractual",
  },
  {
    id: 2,
    title: "Data migration",
    description: "Complete before Q2 2024",
    priority: "high",
    type: "contractual",
  },
  {
    id: 3,
    title: "Monthly audit",
    description: "Next review: January 25",
    priority: "medium",
    type: "contractual",
  },
]

const opportunities = [
  {
    id: 1,
    title: "Advanced Analytics Module",
    client: "Acme Corporation",
    value: "High potential",
    type: "opportunity",
  },
  {
    id: 2,
    title: "CRM Integration",
    client: "TechStart SL",
    value: "Medium potential",
    type: "opportunity",
  },
  {
    id: 3,
    title: "Automated reporting system",
    client: "Global Logistics",
    value: "High potential",
    type: "opportunity",
  },
]

export function HighlightsPanel() {
  return (
    <Card className="p-6 hover:border-primary hover:-translate-y-1 transition-all hover:shadow-lg">
      <h2 className="text-xl font-bold text-foreground mb-6">Highlights</h2>

      {/* Contractual Items */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <h3 className="font-semibold text-foreground">Contractual Obligations</h3>
        </div>
        <div className="space-y-3">
          {contractualItems.map((item) => (
            <div key={item.id} className="border-l-2 border-destructive pl-4 py-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-sm text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                </div>
                <Badge variant={item.priority === "high" ? "destructive" : "secondary"} className="text-xs shrink-0">
                  {item.priority === "high" ? "High" : "Medium"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunities */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-chart-3" />
          <h3 className="font-semibold text-foreground">Sales Opportunities</h3>
        </div>
        <div className="space-y-3">
          {opportunities.map((item) => (
            <div key={item.id} className="border-l-2 border-chart-3 pl-4 py-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-sm text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.client}</p>
                </div>
                <Badge variant="outline" className="text-xs border-chart-3 text-chart-3 shrink-0">
                  {item.value}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
