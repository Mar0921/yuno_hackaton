"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ClientSearch } from "@/components/client-search"
import { PaymentProvidersPanel } from "@/components/payment-providers-panel"
import { BarChart3, FileText, MessageSquare } from "lucide-react"

interface HomePageProps {
  userRole: "sales" | "technical"
  onNavigateToDashboard: () => void
  onNavigateToDocuments: () => void
  onNavigateToChat: () => void
  onLogout: () => void
}

export function HomePage({
  userRole,
  onNavigateToDashboard,
  onNavigateToDocuments,
  onNavigateToChat,
  onLogout,
}: HomePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-card/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <svg className="h-4 w-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-foreground">ClientHub</h1>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground capitalize">
                {userRole === "sales" ? "Ventas" : "Técnico"}
              </span>
              <Button variant="outline" size="sm" onClick={onLogout}>
                Cerrar sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">Bienvenido a tu espacio de trabajo</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {userRole === "sales"
              ? "Gestiona reuniones, insights y oportunidades de venta con herramientas impulsadas por IA"
              : "Accede a documentación técnica, historial de cambios y análisis detallado"}
          </p>
        </div>

        <div className="mb-12">
          <ClientSearch userRole={userRole} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card
            className="p-6 border border-border hover:border-primary cursor-pointer transition-all hover:shadow-lg"
            onClick={onNavigateToDashboard}
          >
            <BarChart3 className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              {userRole === "sales" ? "Ver resúmenes, métricas y oportunidades" : "Documentación y cambios técnicos"}
            </p>
          </Card>

          <Card
            className="p-6 border border-border hover:border-primary cursor-pointer transition-all hover:shadow-lg"
            onClick={onNavigateToChat}
          >
            <MessageSquare className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Chat IA</h3>
            <p className="text-sm text-muted-foreground">Consulta información con nuestro asistente inteligente</p>
          </Card>

          <Card
            className="p-6 border border-border hover:border-primary cursor-pointer transition-all hover:shadow-lg"
            onClick={onNavigateToDocuments}
          >
            <FileText className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Documentos</h3>
            <p className="text-sm text-muted-foreground">Accede a toda la documentación de clientes</p>
          </Card>
        </div>

        <PaymentProvidersPanel />
      </main>
    </div>
  )
}
