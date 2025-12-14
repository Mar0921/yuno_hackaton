"use client"

import { Card } from "@/components/ui/card"
import { CreditCard, Globe, AlertCircle, CheckCircle, DollarSign } from "lucide-react"

export function PaymentProvidersPanel() {
  const providers = [
    {
      name: "Tarjetas de Crédito/Débito",
      status: "active",
      countries: ["Colombia", "México"],
      volume: "Alto",
      agreements: "Comisión estándar 2.9% + $0.30 USD",
    },
    {
      name: "PSE",
      status: "active",
      countries: ["Colombia"],
      volume: "Medio",
      agreements: "Comisión 1.5%",
    },
  ]

  const requirements = [
    { label: "Tarjetas y PSE", status: "completed" },
    { label: "Operación en Colombia", status: "completed" },
    { label: "Operación en México", status: "completed" },
    { label: "Límites de riesgo configurados", status: "active" },
  ]

  return (
    <div className="mt-12">
      <Card className="p-8 border border-border hover:border-primary hover:-translate-y-1 transition-all hover:shadow-lg">
        <div className="flex items-start gap-4 mb-6">
          <CreditCard className="h-8 w-8 text-primary flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Providers y Métodos de Pago</h3>
            <p className="text-muted-foreground">
              Información sobre proveedores de pago, volúmenes esperados, acuerdos comerciales y restricciones
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {providers.map((provider, index) => (
            <Card key={index} className="p-6 bg-secondary/30 border border-border/50 hover:border-primary hover:-translate-y-1 transition-all hover:shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <h4 className="font-semibold text-foreground">{provider.name}</h4>
                <span
                  className={`px-2 py-1 text-xs rounded-lg ${
                    provider.status === "active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {provider.status === "active" ? "Activo" : "Inactivo"}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Países:</span>
                  <span className="text-foreground">{provider.countries.join(", ")}</span>
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Volumen:</span>
                  <span className="text-foreground">{provider.volume}</span>
                </div>

                <div className="pt-2 border-t border-border/50">
                  <p className="text-muted-foreground text-xs mb-1">Acuerdo comercial:</p>
                  <p className="text-foreground text-xs">{provider.agreements}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="border-t border-border pt-6">
          <h4 className="text-sm font-semibold text-foreground mb-4">Requerimientos iniciales</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                {req.status === "completed" ? (
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                )}
                <span className="text-sm text-foreground">{req.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Límites de riesgo por país</p>
                <p className="text-xs text-muted-foreground">Colombia: $50,000 USD/día | México: $75,000 USD/día</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
