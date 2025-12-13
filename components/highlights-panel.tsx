"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, TrendingUp } from "lucide-react"

const contractualItems = [
  {
    id: 1,
    title: "Soporte 24/7",
    description: "Garantizado en contrato hasta Dic 2024",
    priority: "high",
    type: "contractual",
  },
  {
    id: 2,
    title: "Migración de datos",
    description: "Completar antes del Q2 2024",
    priority: "high",
    type: "contractual",
  },
  {
    id: 3,
    title: "Auditoría mensual",
    description: "Siguiente revisión: 25 Enero",
    priority: "medium",
    type: "contractual",
  },
]

const opportunities = [
  {
    id: 1,
    title: "Módulo de Analytics Avanzado",
    client: "Acme Corporation",
    value: "Alto potencial",
    type: "opportunity",
  },
  {
    id: 2,
    title: "Integración con CRM",
    client: "TechStart SL",
    value: "Medio potencial",
    type: "opportunity",
  },
  {
    id: 3,
    title: "Sistema de reportes automatizados",
    client: "Global Logistics",
    value: "Alto potencial",
    type: "opportunity",
  },
]

export function HighlightsPanel() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Highlights</h2>

      {/* Contractual Items */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <h3 className="font-semibold text-foreground">Obligaciones Contractuales</h3>
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
                  {item.priority === "high" ? "Alta" : "Media"}
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
          <h3 className="font-semibold text-foreground">Oportunidades de Venta</h3>
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
