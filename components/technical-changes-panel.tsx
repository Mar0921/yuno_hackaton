"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { GitCommit, Search, ChevronRight, Bug, Wrench, Sparkles } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const changes = [
  {
    id: 1,
    title: "Implementación de caché Redis",
    client: "Acme Corporation",
    technician: "María González",
    date: "2024-01-14",
    type: "Mejora",
    description:
      "Se implementó sistema de caché Redis para optimizar consultas frecuentes. Mejora del 60% en tiempo de respuesta.",
    previousWork: "Sistema anterior usaba caché en memoria local, limitado a instancia única.",
  },
  {
    id: 2,
    title: "Corrección de error en API de pagos",
    client: "TechStart SL",
    technician: "Carlos Ruiz",
    date: "2024-01-13",
    type: "Error",
    description:
      "Se corrigió bug que causaba timeouts en transacciones mayores a 1000€. Implementado retry logic y validación mejorada.",
    previousWork: "API original de Juan Pérez (2023-11) no manejaba reintentos automáticos.",
  },
  {
    id: 3,
    title: "Migración a PostgreSQL 15",
    client: "Global Logistics",
    technician: "Ana Martínez",
    date: "2024-01-12",
    type: "Cambio",
    description:
      "Actualización de PostgreSQL 13 a 15. Aprovecha nuevas características de particionado y mejoras de performance.",
    previousWork: "Configuración inicial por Pedro López (2022-08), actualización necesaria por EOL.",
  },
  {
    id: 4,
    title: "Integración webhooks Slack",
    client: "TechStart SL",
    technician: "María González",
    date: "2024-01-11",
    type: "Mejora",
    description:
      "Implementación de webhooks bidireccionales con Slack. Permite notificaciones en tiempo real y comandos desde chat.",
    previousWork: "Sistema previo usaba polling cada 5 minutos, causaba latencia.",
  },
]

export function TechnicalChangesPanel() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClient, setSelectedClient] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const filteredChanges = changes.filter((change) => {
    const matchesSearch =
      change.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      change.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesClient = selectedClient === "all" || change.client === selectedClient
    const matchesType = selectedType === "all" || change.type === selectedType
    return matchesSearch && matchesClient && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Error":
        return <Bug className="h-4 w-4" />
      case "Mejora":
        return <Sparkles className="h-4 w-4" />
      case "Cambio":
        return <Wrench className="h-4 w-4" />
      default:
        return <GitCommit className="h-4 w-4" />
    }
  }

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "Error":
        return "destructive"
      case "Mejora":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Cambios Técnicos</h2>
          <p className="text-sm text-muted-foreground mt-1">Historial con contexto de trabajo previo</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cambios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger>
              <SelectValue placeholder="Cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los clientes</SelectItem>
              <SelectItem value="Acme Corporation">Acme Corporation</SelectItem>
              <SelectItem value="TechStart SL">TechStart SL</SelectItem>
              <SelectItem value="Global Logistics">Global Logistics</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Error">Errores</SelectItem>
              <SelectItem value="Mejora">Mejoras</SelectItem>
              <SelectItem value="Cambio">Cambios</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Changes List */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        {filteredChanges.map((change) => (
          <div
            key={change.id}
            className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                <div
                  className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                    change.type === "Error"
                      ? "bg-destructive/10 text-destructive"
                      : change.type === "Mejora"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-foreground"
                  }`}
                >
                  {getTypeIcon(change.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                    {change.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {change.client} • {change.technician} •{" "}
                    {new Date(change.date).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </div>

            <div className="space-y-2 mb-3">
              <p className="text-xs text-foreground leading-relaxed">{change.description}</p>
              <div className="bg-muted rounded-md p-2 border-l-2 border-muted-foreground">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium">Trabajo previo:</span> {change.previousWork}
                </p>
              </div>
            </div>

            <Badge variant={getTypeBadgeVariant(change.type) as any} className="text-xs">
              {change.type}
            </Badge>
          </div>
        ))}
      </div>

      {filteredChanges.length === 0 && (
        <div className="text-center py-12">
          <GitCommit className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-sm text-muted-foreground">No se encontraron cambios</p>
        </div>
      )}
    </Card>
  )
}
