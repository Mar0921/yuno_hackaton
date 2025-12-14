"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Upload, X, FileSpreadsheet, FileText, FileImage, Loader2, Download } from "lucide-react"

interface UploadedFile {
  name: string
  size: string
  type: string
  key?: string
}

export function FileUploadSection() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isLoadingFiles, setIsLoadingFiles] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    setIsLoadingFiles(true)
    try {
      const response = await fetch("https://l4pubebewf.execute-api.us-east-1.amazonaws.com/files?folder=uploads")
      if (response.ok) {
        const files = await response.json()
        const formattedFiles = files.map((file: any) => ({
          name: file.Key.replace("uploads/", ""),
          size: (file.Size / 1024).toFixed(2) + " KB",
          type: "application/octet-stream",
          key: file.Key,
        }))
        setUploadedFiles(formattedFiles)
      }
    } catch (error) {
      console.error("[v0] Error loading files:", error)
    } finally {
      setIsLoadingFiles(false)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    setIsUploading(true)

    for (const file of Array.from(e.target.files)) {
      try {
        // Convert file to base64
        const reader = new FileReader()
        reader.readAsDataURL(file)
        await new Promise<void>((resolve, reject) => {
          reader.onloadend = async () => {
            try {
              const base64 = reader.result?.toString().split(",")[1]
              if (!base64) {
                reject(new Error("Failed to convert file to base64"))
                return
              }

              const response = await fetch("https://l4pubebewf.execute-api.us-east-1.amazonaws.com/upload", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  fileName: file.name,
                  folder: "uploads",
                  contentType: file.type,
                  fileBase64: base64,
                }),
              })

              if (response.ok) {
                console.log("[v0] File uploaded successfully:", file.name)
                resolve()
              } else {
                reject(new Error("Upload failed"))
              }
            } catch (error) {
              reject(error)
            }
          }
          reader.onerror = reject
        })
      } catch (error) {
        console.error("[v0] Error uploading file:", file.name, error)
      }
    }

    setIsUploading(false)
    loadFiles() // Reload file list
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const downloadFile = async (fileKey: string, fileName: string) => {
    try {
      const response = await fetch(
        `https://l4pubebewf.execute-api.us-east-1.amazonaws.com/file?key=${encodeURIComponent(fileKey)}`,
      )
      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = fileName
        a.click()
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("[v0] Error downloading file:", error)
    }
  }

  const getFileIcon = (type: string) => {
    if (type.includes("sheet") || type.includes("excel")) {
      return <FileSpreadsheet className="h-5 w-5 text-primary" />
    } else if (type.includes("image")) {
      return <FileImage className="h-5 w-5 text-primary" />
    }
    return <FileText className="h-5 w-5 text-primary" />
  }

  return (
    <Card className="p-8 border border-border mb-12">
      <div className="flex items-start gap-4 mb-6">
        <Upload className="h-8 w-8 text-primary flex-shrink-0" />
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Upload files</h3>
          <p className="text-muted-foreground">
            Upload Excel documents, Drive or any relevant client file. Files will be automatically processed with AI.
          </p>
        </div>
      </div>

      <div
        className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-foreground font-medium mb-1">Click to upload or drag files here</p>
        <p className="text-sm text-muted-foreground">
          Supports Excel, PDF, Word, images and more (Maximum 10MB per file)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          accept=".xlsx,.xls,.csv,.pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
          disabled={isUploading}
        />
      </div>

      {isUploading && (
        <div className="mt-6 flex items-center justify-center gap-2 text-primary">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-medium">Uploading files...</span>
        </div>
      )}

      {isLoadingFiles && (
        <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm">Loading files...</span>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Uploaded files ({uploadedFiles.length})</h4>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-3">
                  {getFileIcon(file.type)}
                  <div>
                    <p className="text-sm font-medium text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.size}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {file.key && (
                    <button
                      onClick={() => downloadFile(file.key!, file.name)}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => removeFile(index)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
