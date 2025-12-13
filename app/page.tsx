"use client"

import { useState } from "react"
import { LoginPage } from "@/components/login-page"
import { HomePage } from "@/components/home-page"
import { SalesDashboard } from "@/components/sales-dashboard"
import { TechnicalDashboard } from "@/components/technical-dashboard"
import { DocumentsPage } from "@/components/documents-page"
import { ChatPage } from "@/components/chat-page"
import { AIChatbot } from "@/components/ai-chatbot"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<"sales" | "technical" | null>(null)
  const [currentView, setCurrentView] = useState<"home" | "dashboard" | "documents" | "chat">("home")

  const handleLogin = (role: "sales" | "technical") => {
    setUserRole(role)
    setIsAuthenticated(true)
    setCurrentView("home")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserRole(null)
    setCurrentView("home")
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <>
      {currentView === "home" ? (
        <HomePage
          userRole={userRole!}
          onNavigateToDashboard={() => setCurrentView("dashboard")}
          onNavigateToDocuments={() => setCurrentView("documents")}
          onNavigateToChat={() => setCurrentView("chat")}
          onLogout={handleLogout}
        />
      ) : (
        <div className="min-h-screen bg-background">
          <header className="border-b border-border/40 bg-card/80 backdrop-blur-xl sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <button onClick={() => setCurrentView("home")} className="flex items-center gap-2 hover:opacity-80">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                    <svg className="h-4 w-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </div>
                  <h1 className="text-xl font-semibold text-foreground">ClientHub</h1>
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground capitalize">
                    {userRole === "sales" ? "Ventas" : "Técnico"}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          </header>

          <main className="pb-20">
            {currentView === "dashboard" && (userRole === "sales" ? <SalesDashboard /> : <TechnicalDashboard />)}
            {currentView === "documents" && <DocumentsPage userRole={userRole!} />}
            {currentView === "chat" && <ChatPage />}
          </main>

          {isAuthenticated && <AIChatbot />}
        </div>
      )}
    </>
  )
}
