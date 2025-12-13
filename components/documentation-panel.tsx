"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FileText, Search, ChevronRight, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const documents = [
  {
    id: 1,
    title: "Arquitectura del Sistema - Acme Corp",
    client: "Acme Corporation",
    summary:
      "Documentación completa de la arquitectura del sistema implementado. Incluye diagramas de flujo, estructura de base de datos y APIs disponibles.",
    lastUpdated: "2024-01-15",
    type: "Arquitectura",
    pages: 24,
  },
  {
    id: 2,
    title: "Guía de Integración Slack API",
    client: "TechStart SL",
    summary:
      "Manual técnico para la integración con Slack. Detalla endpoints, autenticación OAuth y manejo de webhooks en tiempo real.",
    lastUpdated: "2024-01-14",
    type: "Integración",
    pages: 18,
  },
  {
    id: 3,
    title: "Optimización de Base de Datos",
    client: "Global Logistics",
    summary:
      "Resumen de las optimizaciones aplicadas a las consultas de base de datos. Incluye índices creados y mejoras de rendimiento obtenidas.",
    lastUpdated: "2024-01-13",
    type: "Performance",
    pages: 12,
  },
  {
    id: 4,
    title: "Protocolo de Seguridad y Backups",
    client: "Acme Corporation",
    summary:
      "Documentación de medidas de seguridad implementadas y procedimientos de backup automático. Incluye plan de recuperación ante desastres.",
    lastUpdated: "2024-01-10",
    type: "Seguridad",
    pages: 32,
  },
]

export function DocumentationPanel() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClient, setSelectedClient] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesClient = selectedClient === "all" || doc.client === selectedClient
    const matchesType = selectedType === "all" || doc.type === selectedType
    return matchesSearch && matchesClient && matchesType
  })

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Documentación</h2>
          <p className="text-sm text-muted-foreground mt-1">Con resúmenes generados por IA</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Exportar
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar documentación..."
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
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="Arquitectura">Arquitectura</SelectItem>
              <SelectItem value="Integración">Integración</SelectItem>
              <SelectItem value="Performance">Performance</SelectItem>
              <SelectItem value="Seguridad">Seguridad</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start gap-3 flex-1">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{doc.client}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{doc.summary}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {doc.type}
                </Badge>
                <span className="text-xs text-muted-foreground">{doc.pages} páginas</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(doc.lastUpdated).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-sm text-muted-foreground">No se encontraron documentos</p>
        </div>
      )}
    </Card>
  )
}
