"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Upload, Download, Search, Filter, Calendar, Mic } from "lucide-react"

interface Document {
  Key: string
  LastModified: string
  Size: number
  StorageClass: string
}

interface DocumentsPageProps {
  userRole: "sales" | "technical"
}

export function DocumentsPage({ userRole }: DocumentsPageProps) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [filteredDocs, setFilteredDocs] = useState<Document[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClient, setSelectedClient] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    loadDocuments()
  }, [])

  useEffect(() => {
    filterDocuments()
  }, [documents, searchQuery, selectedClient, selectedType])

  const loadDocuments = async () => {
    try {
      const response = await fetch("https://l4pubebewf.execute-api.us-east-1.amazonaws.com/files?folder=uploads")
      const data = await response.json()
      setDocuments(data)
    } catch (error) {
      console.error("[v0] Error loading documents:", error)
    }
  }

  const filterDocuments = () => {
    let filtered = documents

    if (searchQuery) {
      filtered = filtered.filter((doc) => doc.Key.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    if (selectedClient !== "all") {
      filtered = filtered.filter((doc) => doc.Key.toLowerCase().includes(selectedClient.toLowerCase()))
    }

    if (selectedType !== "all") {
      const extension = `.${selectedType}`
      filtered = filtered.filter((doc) => doc.Key.toLowerCase().endsWith(extension))
    }

    setFilteredDocs(filtered)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64 = e.target?.result?.toString().split(",")[1]
        if (!base64) return

        const response = await fetch("https://l4pubebewf.execute-api.us-east-1.amazonaws.com/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: file.name,
            folder: "uploads",
            contentType: file.type || "application/octet-stream",
            fileBase64: base64,
          }),
        })

        if (response.ok) {
          await loadDocuments()
        }
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error("[v0] Error uploading file:", error)
    } finally {
      setUploading(false)
    }
  }

  const handleDownload = async (key: string) => {
    try {
      const response = await fetch(`https://l4pubebewf.execute-api.us-east-1.amazonaws.com/file?key=${key}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = key.split("/").pop() || "download"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("[v0] Error downloading file:", error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <div className="container mx-auto px-6 py-16 max-w-7xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Documentos</h1>
        <p className="text-lg text-muted-foreground">
          Gestiona y accede a toda la documentación de clientes y transcripciones
        </p>
      </div>

      {/* Upload Section */}
      <Card className="p-8 mb-8 border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Upload className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Subir Documento</h3>
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Mic className="h-4 w-4" />
            Ver Transcripciones
          </Button>
        </div>
        <div className="flex gap-4">
          <Input
            type="file"
            onChange={handleFileUpload}
            disabled={uploading}
            className="flex-1"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv"
          />
          <Button disabled={uploading}>{uploading ? "Subiendo..." : "Subir Archivo"}</Button>
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          Formatos soportados: PDF, Word, Excel, CSV, TXT. Las grabaciones se transcribirán automáticamente.
        </p>
      </Card>

      {/* Filters */}
      <Card className="p-6 mb-8 border-border/50">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Filtros</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar documentos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger>
              <SelectValue placeholder="Todos los clientes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los clientes</SelectItem>
              <SelectItem value="acme">Acme Corporation</SelectItem>
              <SelectItem value="techstart">TechStart SL</SelectItem>
              <SelectItem value="global">Global Logistics</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo de archivo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="xlsx">Excel</SelectItem>
              <SelectItem value="docx">Word</SelectItem>
              <SelectItem value="txt">Texto</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Documents List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {filteredDocs.length} documento{filteredDocs.length !== 1 ? "s" : ""} encontrado
          {filteredDocs.length !== 1 ? "s" : ""}
        </h3>

        {filteredDocs.map((doc) => (
          <Card key={doc.Key} className="p-6 border-border/50 hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <FileText className="h-8 w-8 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">{doc.Key.split("/").pop()}</h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(doc.LastModified)}
                    </span>
                    <span>{formatSize(doc.Size)}</span>
                  </div>
                </div>
              </div>
              <Button onClick={() => handleDownload(doc.Key)} variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Descargar
              </Button>
            </div>
          </Card>
        ))}

        {filteredDocs.length === 0 && (
          <Card className="p-12 text-center border-border/50">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No se encontraron documentos con los filtros aplicados</p>
          </Card>
        )}
      </div>
    </div>
  )
}
