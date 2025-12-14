"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

const meetings = [
  {
    id: 1,
    client: "Acme Corporation",
    date: "2024-01-15",
    duration: "45 min",
    summary:
      "Discusión sobre la expansión del sistema de inventario. El cliente mostró interés en módulos de predicción de demanda y análisis avanzado.",
    topics: ["Inventario", "Predicción", "Analytics"],
    opportunities: 2,
    period: "Enero 2024",
  },
  {
    id: 2,
    client: "TechStart SL",
    date: "2024-01-12",
    duration: "60 min",
    summary:
      "Revisión trimestral del proyecto. Se identificaron necesidades de integración con Slack y Drive para mejorar el flujo de trabajo del equipo.",
    topics: ["Integraciones", "Workflow", "Slack"],
    opportunities: 1,
    period: "Enero 2024",
  },
  {
    id: 3,
    client: "Global Logistics",
    date: "2024-01-10",
    duration: "30 min",
    summary:
      "Presentación de nuevas funcionalidades del dashboard. El cliente solicitó métricas personalizadas y exportación automatizada de reportes.",
    topics: ["Dashboard", "Reportes", "Métricas"],
    opportunities: 3,
    period: "Enero 2024",
  },
]

export function MeetingSummaries() {
  const [selectedPeriod, setSelectedPeriod] = useState("Todos")
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-3">Resúmenes de Reuniones</h2>
        <p className="text-lg text-muted-foreground">
          Generados automáticamente por IA para mantener a tu equipo informado
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {meetings.map((meeting) => (
          <Card
            key={meeting.id}
            className="p-8 border-border/50 hover:border-primary transition-all hover:shadow-lg hover:-translate-y-1 group cursor-pointer"
            onClick={() => setExpandedId(expandedId === meeting.id ? null : meeting.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {meeting.client}
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(meeting.date).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {meeting.duration}
                  </div>
                </div>
              </div>
              {expandedId === meeting.id ? (
                <ChevronUp className="h-5 w-5 text-primary" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all" />
              )}
            </div>

            <p className="text-base text-muted-foreground mb-4 leading-relaxed">{meeting.summary}</p>

            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex flex-wrap gap-2">
                {meeting.topics.map((topic, idx) => (
                  <Badge key={idx} variant="secondary" className="text-sm py-1 px-3">
                    {topic}
                  </Badge>
                ))}
              </div>
              {meeting.opportunities > 0 && (
                <Badge className="text-sm py-1 px-3 bg-primary/10 text-primary border-0">
                  {meeting.opportunities} {meeting.opportunities === 1 ? "oportunidad" : "oportunidades"}
                </Badge>
              )}
            </div>

            {expandedId === meeting.id && (
              <div className="mt-6 pt-6 border-t border-border/50">
                <h4 className="font-semibold text-foreground mb-3">Detalles completos de la reunión</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{meeting.summary}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-2">Participantes</h5>
                    <p className="text-sm text-muted-foreground">Equipo de ventas y {meeting.client}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-2">Acciones pendientes</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Seguimiento de propuestas enviadas</li>
                      <li>• Preparar demo de nuevas funcionalidades</li>
                      <li>• Coordinar reunión técnica</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
