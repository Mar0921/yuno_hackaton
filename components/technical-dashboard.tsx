"use client"

import { Card } from "@/components/ui/card"
import { DocumentationPanel } from "@/components/documentation-panel"
import { TechnicalChangesPanel } from "@/components/technical-changes-panel"
import { TechnicalStatsChart } from "@/components/technical-stats-chart"

export function TechnicalDashboard() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-7xl">
      <div className="text-center max-w-4xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full mb-6">
          <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm font-medium text-foreground">Dashboard Técnico</span>
        </div>
        <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
          Documentación técnica organizada y accesible
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Accede a la documentación completa, historial de cambios filtrados y explicaciones de trabajo previo de otros
          técnicos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
        <Card className="p-8 text-center border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
          <div className="text-4xl font-bold text-foreground mb-2">156</div>
          <p className="text-sm text-muted-foreground">Documentos totales</p>
        </Card>

        <Card className="p-8 text-center border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
          <div className="text-4xl font-bold text-primary mb-2">42</div>
          <p className="text-sm text-muted-foreground">Cambios este mes</p>
        </Card>

        <Card className="p-8 text-center border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
          <div className="text-4xl font-bold text-destructive mb-2">3</div>
          <p className="text-sm text-muted-foreground">Errores activos</p>
        </Card>

        <Card className="p-8 text-center border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
          <div className="text-4xl font-bold text-foreground mb-2">89</div>
          <p className="text-sm text-muted-foreground">Resueltos este mes</p>
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
  )
}
