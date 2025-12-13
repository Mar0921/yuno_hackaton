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
    title: "Implementación de caché Redis",
    summary:
      "Se optimizó el rendimiento del sistema implementando caché Redis. Esto mejoró los tiempos de respuesta en un 60% para consultas frecuentes.",
    impact: "Alto",
    technician: "María González",
  },
  {
    id: 2,
    client: "TechStart SL",
    date: "2024-01-13",
    title: "Migración a nueva versión de API",
    summary:
      "Se actualizó la integración con servicios externos a la versión 3.0, añadiendo compatibilidad con webhooks en tiempo real.",
    impact: "Medio",
    technician: "Carlos Ruiz",
  },
]

export function TechnicalSummaries() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Resúmenes Técnicos</h2>
          <p className="text-sm text-muted-foreground mt-1">Traducidos a lenguaje no técnico por IA</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Code className="h-4 w-4" />
          Ver detalles técnicos
        </Button>
      </div>

      <div className="space-y-4">
        {summaries.map((summary) => (
          <div
            key={summary.id}
            className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer group"
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
                  {summary.client} • {new Date(summary.date).toLocaleDateString("es-ES")} • {summary.technician}
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
