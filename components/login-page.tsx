"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Wrench } from "lucide-react"

interface LoginPageProps {
  onLogin: (role: "sales" | "technical") => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<"sales" | "technical" | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedRole && email && password) {
      onLogin(selectedRole)
    }
  }

  return (
    <div className="min-h-screen bg-[#e2e8f1] flex items-center justify-center px-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
              <svg className="h-6 w-6 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">Bienvenido a ClientHub</h1>
          <p className="text-lg text-muted-foreground">Gestión inteligente de clientes y documentación técnica</p>
        </div>

        {!selectedRole ? (
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Card
              className="p-8 border-2 border-border hover:border-primary cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
              onClick={() => setSelectedRole("sales")}
            >
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Ventas</h2>
                <p className="text-muted-foreground mb-6">
                  Accede a resúmenes de reuniones, insights y oportunidades de venta
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 text-left w-full">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Resúmenes de reuniones por época</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Chatbot con IA para consultas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Highlights y oportunidades</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card
              className="p-8 border-2 border-border hover:border-primary cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
              onClick={() => setSelectedRole("technical")}
            >
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Técnico</h2>
                <p className="text-muted-foreground mb-6">
                  Documentación técnica, cambios previos y análisis detallado
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 text-left w-full">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Documentación con resúmenes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Historial de cambios filtrado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Trabajo previo de otros técnicos</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        ) : (
          <Card className="max-w-md mx-auto p-8 border border-border hover:-translate-y-1 transition-all hover:shadow-lg">
            <div className="mb-6">
              <button
                onClick={() => setSelectedRole(null)}
                className="text-sm text-muted-foreground hover:text-foreground mb-4"
              >
                ← Volver a selección de perfil
              </button>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Iniciar sesión como {selectedRole === "sales" ? "Ventas" : "Técnico"}
              </h2>
              <p className="text-muted-foreground">Ingresa tus credenciales para continuar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Iniciar sesión
              </Button>
            </form>

            <p className="text-xs text-center text-muted-foreground mt-6">
              ¿Olvidaste tu contraseña? <button className="text-primary hover:underline">Recuperar acceso</button>
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
