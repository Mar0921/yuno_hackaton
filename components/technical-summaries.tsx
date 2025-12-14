"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, GitBranch, ChevronRight } from "lucide-react"

const summaries = [
  {
    id: 1,
    client: "Acme Corporation",
    date: "2024-01-14",
    title: "Redis cache implementation",
    summary:
      "System performance was optimized by implementing Redis cache. This improved response times by 60% for frequent queries.",
    impact: "High",
    technician: "María González",
  },
  {
    id: 2,
    client: "TechStart SL",
    date: "2024-01-13",
    title: "Migration to new API version",
    summary:
      "Integration with external services was updated to version 3.0, adding compatibility with real-time webhooks.",
    impact: "Medium",
    technician: "Carlos Ruiz",
  },
]

export function TechnicalSummaries() {
  return (
    <Card className="p-6 hover:border-primary hover:-translate-y-1 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Technical Summaries</h2>
          <p className="text-sm text-muted-foreground mt-1">Translated to non-technical language by AI</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Code className="h-4 w-4" />
          View technical details
        </Button>
      </div>

      <div className="space-y-4">
        {summaries.map((summary) => (
          <div
            key={summary.id}
            className="border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <GitBranch className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {summary.title}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  {summary.client} • {new Date(summary.date).toLocaleDateString("en-US")} • {summary.technician}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-3">{summary.summary}</p>

            <div className="flex items-center justify-between">
              <Badge variant={summary.impact === "Alto" ? "default" : "secondary"} className="text-xs">
                Impacto: {summary.impact}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
