"use client"

import { useState } from "react"
import { HomePage } from "@/components/home-page"
import { SalesDashboard } from "@/components/sales-dashboard"
import { TechnicalDashboard } from "@/components/technical-dashboard"
import { DocumentsPage } from "@/components/documents-page"
import { ChatPage } from "@/components/chat-page"
import { AIChatbot } from "@/components/ai-chatbot"
import { DynamicDashboardAndChat } from "@/components/dynamic-dashboard/dashboard-container"

export default function Home() {
  const [userRole, setUserRole] = useState<"sales" | "technical">("sales")
  const [currentView, setCurrentView] = useState<"home" | "dashboard" | "documents" | "chat" | "ai-dashboard">("home")

  const toggleRole = () => {
    setUserRole(userRole === "sales" ? "technical" : "sales")
  }

  return (
    <>
      {currentView === "home" ? (
        <HomePage
          userRole={userRole}
          onNavigateToDashboard={() => setCurrentView("dashboard")}
          onNavigateToDocuments={() => setCurrentView("documents")}
          onNavigateToChat={() => setCurrentView("ai-dashboard")}
          onToggleRole={toggleRole}
        />
      ) : (
        <div className={`min-h-screen ${userRole === "sales" ? "bg-[#e2e8f1]" : "bg-[#e8e2f1]"} transition-colors duration-500`}>
          <header className="border-b border-border/40 bg-card/80 backdrop-blur-xl sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
              <div className="grid grid-cols-3 items-center">
                <button onClick={() => setCurrentView("home")} className="flex items-center gap-2 hover:opacity-80 w-fit">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                    <svg className="h-4 w-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </div>
                </button>
                <div className="flex justify-center">
                  <div className="role-toggle-slider group" onClick={toggleRole}>
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
                  <h1 className="text-xl font-semibold text-foreground mr-4">ClientHub</h1>
                </div>
              </div>
            </div>
          </header>

          <main className="pb-20">
            {currentView === "dashboard" && (userRole === "sales" ? <SalesDashboard userRole={userRole} /> : <TechnicalDashboard userRole={userRole} />)}
            {currentView === "ai-dashboard" && <div className="container mx-auto px-6 py-8"><DynamicDashboardAndChat /></div>}
            {currentView === "documents" && <DocumentsPage userRole={userRole!} />}
            {currentView === "chat" && <ChatPage />}
          </main>


        </div>
      )}
    </>
  )
}
