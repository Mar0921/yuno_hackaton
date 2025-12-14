"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClientSearch } from "@/components/client-search"
import { ArrowLeft } from "lucide-react"
import { TrendingUp, DollarSign, Users, Target } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const clientMonthlyRevenue = [
  { month: "Ene", revenue: 12000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 13000 },
  { month: "Abr", revenue: 18000 },
  { month: "May", revenue: 16000 },
  { month: "Jun", revenue: 20000 },
]

const clientSalesByCategory = [
  { category: "Integraciones", count: 5 },
  { category: "Analytics", count: 4 },
  { category: "Automatización", count: 3 },
  { category: "CRM", count: 2 },
]

interface SalesClientsDashboardProps {
  onBack: () => void
}

export function SalesClientsDashboard({ onBack }: SalesClientsDashboardProps) {
  return (
    <div className="container mx-auto px-6 py-16 max-w-7xl">
      <div className="mb-6">
        <Button onClick={onBack} variant="outline" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al Dashboard de Ventas
        </Button>
      </div>
      <div className="text-center max-w-4xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full mb-6">
          <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm font-medium text-foreground">Dashboard de Clientes</span>
        </div>
        <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
          Estadísticas detalladas del cliente seleccionado
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Visualiza el rendimiento, reuniones y oportunidades específicas de este cliente.
        </p>
      </div>

      <div className="space-y-8 mb-16">
        <ClientSearch userRole="sales" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">8</div>
            <p className="text-sm text-muted-foreground">Reuniones con este cliente</p>
          </Card>

          <Card className="p-6 border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-primary mb-1">3</div>
            <p className="text-sm text-muted-foreground">Oportunidades activas</p>
          </Card>

          <Card className="p-6 border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">$45K</div>
            <p className="text-sm text-muted-foreground">Revenue total</p>
          </Card>

          <Card className="p-6 border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">92%</div>
            <p className="text-sm text-muted-foreground">Satisfacción</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-6">Revenue Mensual del Cliente</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={clientMonthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-6">Ventas por Categoría del Cliente</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clientSalesByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="p-6 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-6">Hitos Importantes del Cliente</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-foreground mb-2">Merchant: Zoop</h4>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-3">Momentos clave:</h5>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Primera llamada comercial</li>
                  <li>Firma de contrato (con promesas comerciales)</li>
                  <li>Inicio de implementación e integraciones</li>
                  <li>Salida a producción (Go-Live)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-3">Requerimientos iniciales:</h5>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Tarjetas y PSE</li>
                  <li>Operación en Colombia y México</li>
                  <li>Límites de riesgo por país</li>
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
                <h5 className="font-medium text-foreground mb-3">Cosas a tener en cuenta para la reunión:</h5>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                  <li>Revisar el progreso de implementación</li>
                  <li>Discutir posibles expansiones a nuevos mercados</li>
                  <li>Evaluar satisfacción del cliente</li>
                  <li>Planificar próximos hitos</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}