"use client"
import { Card } from "@/components/ui/card"
import { ClientSearch } from "@/components/client-search"
import { PaymentProvidersPanel } from "@/components/payment-providers-panel"
import { BarChart3, FileText, MessageSquare } from "lucide-react"

interface HomePageProps {
  userRole: "sales" | "technical"
  onNavigateToDashboard: () => void
  onNavigateToDocuments: () => void
  onNavigateToChat: () => void
  onToggleRole: () => void
}

export function HomePage({
  userRole,
  onNavigateToDashboard,
  onNavigateToDocuments,
  onNavigateToChat,
  onToggleRole,
}: HomePageProps) {
  return (
    <div className={`min-h-screen ${userRole === "sales" ? "bg-[#e2e8f1]" : "bg-[#e8e2f1]"} transition-colors duration-500`}>
      <header className="border-b border-border/40 bg-card/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="grid grid-cols-3 items-center">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <svg className="h-4 w-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <div className="flex justify-center">
              <div className="role-toggle-slider group" onClick={onToggleRole}>
                <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
                  <span className={`role-toggle-label ${userRole === "sales" ? "active" : "inactive"}`}>
                    Sales
                  </span>
                  <span className={`role-toggle-label ${userRole === "technical" ? "active" : "inactive"}`}>
                    Technical
                  </span>
                </div>
                <div className={`role-toggle-slide ${userRole === "sales" ? "sales" : "technical"}`}>
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <h1 className="text-xl font-semibold text-foreground">ClientHub</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-16">
           <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">Welcome to your workspace</h1>
           <p className="text-xl text-muted-foreground leading-relaxed">
             {userRole === "sales"
               ? "Manage meetings, insights and sales opportunities with AI-powered tools"
               : "Access technical documentation, change history and detailed analysis"}
           </p>
         </div>

        <div className="mb-12">
          <ClientSearch userRole={userRole} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card
            className="p-6 border border-border hover:border-primary cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
            onClick={onNavigateToDashboard}
          >
            <BarChart3 className={`h-10 w-10 mb-4 ${userRole === "sales" ? "text-blue-500" : "text-purple-500"}`} />
            <h3 className="text-lg font-semibold text-foreground mb-2">Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              {userRole === "sales" ? "View summaries, metrics and opportunities" : "Technical documentation and changes"}
            </p>
          </Card>

          <Card
            className="p-6 border border-border hover:border-primary cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
            onClick={onNavigateToChat}
          >
            <MessageSquare className={`h-10 w-10 mb-4 ${userRole === "sales" ? "text-blue-500" : "text-purple-500"}`} />
            <h3 className="text-lg font-semibold text-foreground mb-2">AI Chat</h3>
            <p className="text-sm text-muted-foreground">Consult information with our intelligent assistant</p>
          </Card>

          <Card
            className="p-6 border border-border hover:border-primary cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
            onClick={onNavigateToDocuments}
          >
            <FileText className={`h-10 w-10 mb-4 ${userRole === "sales" ? "text-blue-500" : "text-purple-500"}`} />
            <h3 className="text-lg font-semibold text-foreground mb-2">Documents</h3>
            <p className="text-sm text-muted-foreground">Access all client documentation</p>
          </Card>
        </div>

        <PaymentProvidersPanel />
      </main>
    </div>
  )
}
