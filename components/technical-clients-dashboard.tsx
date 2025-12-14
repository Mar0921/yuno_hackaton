"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClientSearch } from "@/components/client-search"
import { ArrowLeft } from "lucide-react"
import { TrendingUp, DollarSign, Users, Target } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const clientMonthlyErrors = [
  { month: "Ene", errors: 5 },
  { month: "Feb", errors: 3 },
  { month: "Mar", errors: 7 },
  { month: "Abr", errors: 2 },
  { month: "May", errors: 4 },
  { month: "Jun", errors: 1 },
]

const clientChangesByType = [
  { type: "Mejora", count: 8 },
  { type: "Error", count: 3 },
  { type: "Cambio", count: 5 },
]

interface TechnicalClientsDashboardProps {
  onBack: () => void
}

export function TechnicalClientsDashboard({ onBack }: TechnicalClientsDashboardProps) {
  return (
    <div className="min-h-screen bg-[#e2e8f1]">
      <div className="container mx-auto px-6 py-16 max-w-7xl">
      <div className="mb-6">
        <Button onClick={onBack} variant="outline" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al Dashboard Técnico
        </Button>
      </div>
      <div className="text-center max-w-4xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full mb-6">
          <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm font-medium text-foreground">Dashboard de Clientes Técnicos</span>
        </div>
        <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
          Estadísticas detalladas del cliente técnico seleccionado
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Visualiza el rendimiento técnico, errores y cambios específicos de este cliente.
        </p>
      </div>

      <div className="space-y-8 mb-16">
        <ClientSearch userRole="technical" />

        <Card className="p-6 border-border/50 hover:border-primary hover:-translate-y-1 transition-all hover:shadow-lg">
          <h3 className="text-lg font-semibold text-foreground mb-6">Hitos Importantes del Cliente Técnico</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-foreground mb-2">Merchant: TechCorp</h4>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-3">Momentos clave:</h5>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Primera implementación técnica</li>
                  <li>Resolución de errores críticos</li>
                  <li>Migración a nueva infraestructura</li>
                  <li>Optimización de rendimiento</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-3">Requerimientos técnicos iniciales:</h5>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Integración con APIs externas</li>
                  <li>Base de datos PostgreSQL</li>
                  <li>Monitoreo y logging</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <iframe
                src="https://calendar.google.com/calendar/embed?src=es-419%23week%40group.v.calendar.google.com&ctz=America%2FMexico_City"
                frameBorder="0"
                scrolling="no"
                className="w-full h-64 border rounded-lg"
              ></iframe>
              <div>
                <h5 className="font-medium text-foreground mb-3">Cosas a tener en cuenta para la reunión técnica:</h5>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                  <li>Revisar logs de errores recientes</li>
                  <li>Discutir mejoras de seguridad</li>
                  <li>Evaluar rendimiento del sistema</li>
                  <li>Planificar mantenimiento preventivo</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 border-border/50 hover:border-primary transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">12</div>
            <p className="text-sm text-muted-foreground">Cambios realizados</p>
          </Card>

          <Card className="p-6 border-border/50 hover:border-primary transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-primary mb-1">2</div>
            <p className="text-sm text-muted-foreground">Errores activos</p>
          </Card>

          <Card className="p-6 border-border/50 hover:border-primary transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">95%</div>
            <p className="text-sm text-muted-foreground">Uptime sistema</p>
          </Card>

          <Card className="p-6 border-border/50 hover:border-primary transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">8</div>
            <p className="text-sm text-muted-foreground">Mejoras implementadas</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 border-border/50 hover:border-primary hover:-translate-y-1 transition-all hover:shadow-lg">
            <h3 className="text-lg font-semibold text-foreground mb-6">Errores Mensuales del Cliente</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={clientMonthlyErrors}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="#000000" tick={{ fill: "#000000" }} />
                <YAxis stroke="#000000" tick={{ fill: "#000000" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "#000000",
                  }}
                />
                <Line type="monotone" dataKey="errors" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 border-border/50 hover:border-primary hover:-translate-y-1 transition-all hover:shadow-lg">
            <h3 className="text-lg font-semibold text-foreground mb-6">Cambios por Tipo del Cliente</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clientChangesByType}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="type" stroke="#000000" tick={{ fill: "#000000" }} />
                <YAxis stroke="#000000" tick={{ fill: "#000000" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
    </div>
  )
}