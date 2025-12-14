"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FileText, Search, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const documents = [
  {
    id: 1,
    title: "System Architecture - Acme Corp",
    client: "Acme Corporation",
    summary:
      "Complete documentation of the implemented system architecture. Includes flow diagrams, database structure and available APIs.",
    lastUpdated: "2024-01-15",
    type: "Architecture",
    pages: 24,
  },
  {
    id: 2,
    title: "Slack API Integration Guide",
    client: "TechStart SL",
    summary:
      "Technical manual for Slack integration. Details endpoints, OAuth authentication and real-time webhook handling.",
    lastUpdated: "2024-01-14",
    type: "Integration",
    pages: 18,
  },
  {
    id: 3,
    title: "Database Optimization",
    client: "Global Logistics",
    summary:
      "Summary of optimizations applied to database queries. Includes created indexes and performance improvements obtained.",
    lastUpdated: "2024-01-13",
    type: "Performance",
    pages: 12,
  },
  {
    id: 4,
    title: "Security Protocol and Backups",
    client: "Acme Corporation",
    summary:
      "Documentation of implemented security measures and automatic backup procedures. Includes disaster recovery plan.",
    lastUpdated: "2024-01-10",
    type: "Security",
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
    <Card className="p-6 hover:border-primary hover:-translate-y-1 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Documentation</h2>
          <p className="text-sm text-muted-foreground mt-1">With AI-generated summaries</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger>
              <SelectValue placeholder="Client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All clients</SelectItem>
              <SelectItem value="Acme Corporation">Acme Corporation</SelectItem>
              <SelectItem value="TechStart SL">TechStart SL</SelectItem>
              <SelectItem value="Global Logistics">Global Logistics</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="Architecture">Architecture</SelectItem>
              <SelectItem value="Integration">Integration</SelectItem>
              <SelectItem value="Performance">Performance</SelectItem>
              <SelectItem value="Security">Security</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="border border-border rounded-lg p-4"
          >
            <div className="flex items-start gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm">
                  {doc.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{doc.client}</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{doc.summary}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {doc.type}
                </Badge>
                <span className="text-xs text-muted-foreground">{doc.pages} pages</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(doc.lastUpdated).toLocaleDateString("en-US", {
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
          <p className="text-sm text-muted-foreground">No documents found</p>
        </div>
      )}
    </Card>
  )
}
