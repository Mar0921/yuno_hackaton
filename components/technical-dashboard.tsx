"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DocumentationPanel } from "@/components/documentation-panel"
import { TechnicalChangesPanel } from "@/components/technical-changes-panel"
import { TechnicalStatsChart } from "@/components/technical-stats-chart"
import { TechnicalClientsDashboard } from "@/components/technical-clients-dashboard"
import { Users } from "lucide-react"

export function TechnicalDashboard({ userRole }: { userRole: "sales" | "technical" }) {
  const [view, setView] = useState<'dashboard' | 'clients'>('dashboard')

  if (view === 'clients') {
    return <TechnicalClientsDashboard onBack={() => setView('dashboard')} />
  }

  return (
    <div className={`min-h-screen ${userRole === "sales" ? "bg-[#e2e8f1]" : "bg-[#e8e2f1]"} transition-colors duration-500`}>
      <div className="container mx-auto px-6 py-16 max-w-7xl">
      <div className="text-center max-w-4xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full mb-6">
           <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
           <span className="text-sm font-medium text-foreground">Technical Dashboard</span>
         </div>
         <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
           Organized and accessible technical documentation
         </h1>
         <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
           Access complete documentation, filtered change history and explanations of previous work by other technicians.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-20">
        <Card className="p-8 text-center border-border/50 hover:border-primary transition-all hover:shadow-lg hover:-translate-y-1">
          <div className="text-4xl font-bold text-foreground mb-2">156</div>
          <p className="text-sm text-muted-foreground">Total documents</p>
        </Card>

        <Card className="p-8 text-center border-border/50 hover:border-primary transition-all hover:shadow-lg hover:-translate-y-1">
          <div className="text-4xl font-bold text-primary mb-2">42</div>
          <p className="text-sm text-muted-foreground">Changes this month</p>
        </Card>

        <Card className="p-8 text-center border-border/50 hover:border-primary transition-all hover:shadow-lg hover:-translate-y-1">
          <div className="text-4xl font-bold text-destructive mb-2">3</div>
          <p className="text-sm text-muted-foreground">Active errors</p>
        </Card>

        <Card className="p-8 text-center border-border/50 hover:border-primary transition-all hover:shadow-lg hover:-translate-y-1">
          <div className="text-4xl font-bold text-foreground mb-2">89</div>
          <p className="text-sm text-muted-foreground">Resolved this month</p>
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

      <div className="space-y-16">
        <TechnicalStatsChart />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DocumentationPanel />
          <TechnicalChangesPanel />
        </div>
      </div>
    </div>
    </div>
  )
}
