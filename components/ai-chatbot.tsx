"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Send, Loader2, Sparkles, X } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const suggestedPrompts = [
  "What are the latest updates from the Acme client?",
  "Summary of sales opportunities this month",
  "Show me recent technical changes",
  "What contractual obligations are pending?",
]

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello, I am your AI assistant. I can help you find information about clients, meetings, technical documentation and much more. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response (in production, this would call OpenAI API)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateMockResponse(input),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const handlePromptClick = (prompt: string) => {
    setInput(prompt)
  }

  const generateMockResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()
    if (lowerQuery.includes("acme") || lowerQuery.includes("update")) {
      return "The Acme Corporation client had a meeting on January 15th where they discussed the expansion of the inventory system. 2 opportunities were identified: demand prediction modules and advanced analytics. In addition, the technical team implemented Redis cache on January 14th, improving performance by 60%."
    } else if (lowerQuery.includes("opportunity") || lowerQuery.includes("sale")) {
      return "This month 12 sales opportunities have been identified: 3 high potential (Advanced Analytics for Acme, Reporting System for Global Logistics, and Custom CRM) and 9 medium potential. The most requested areas are: integrations (40%), analytics (30%) and automation (30%)."
    } else if (lowerQuery.includes("technical") || lowerQuery.includes("change")) {
      return "The most recent technical changes include: Redis cache implementation for Acme Corporation (Jan 14), migration to API v3.0 for TechStart SL (Jan 13), and database query optimization for Global Logistics (Jan 10). All changes have been documented and translated into non-technical language."
    } else if (
      lowerQuery.includes("contractual") ||
      lowerQuery.includes("obligation") ||
      lowerQuery.includes("pending")
    ) {
      return "Pending contractual obligations: 24/7 support guaranteed until Dec 2024 (high priority), Data migration to be completed before Q2 2024 (high priority), and Monthly audit scheduled for January 25 (medium priority). It is recommended to review these obligations with the team."
    } else {
      return "I have processed your query. I can help you with information about meetings, clients, technical documentation, sales opportunities, contractual obligations and much more. Could you be more specific about what information you need?"
    }
  }

  return (
    <div>
      {/* Messages Container */}
      {isOpen && (
        <Card className="fixed bottom-24 right-8 w-[440px] h-[640px] flex flex-col shadow-2xl z-50 border-border/50">
          <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">AI Assistant</h3>
                <p className="text-xs opacity-90">Always available to help you</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground border border-border/50"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-3 w-3 text-primary" />
                      <span className="text-xs font-medium text-primary">IA</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p
                    className={`text-xs mt-2 ${message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                  >
                    {message.timestamp.toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl p-4 bg-muted border border-border/50">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          {messages.length === 1 && (
            <div className="px-6 pb-3">
              <p className="text-xs text-muted-foreground mb-3 font-medium">Quick suggestions:</p>
              <div className="flex flex-col gap-2">
                {suggestedPrompts.slice(0, 2).map((prompt, idx) => (
                  <button
                    key={idx}
                    className="text-left text-sm p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors border border-border/30"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-6 border-t border-border">
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your question..."
                className="flex-1 h-12 rounded-xl"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                size="icon"
                disabled={isLoading || !input.trim()}
                className="h-12 w-12 rounded-xl"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl hover:shadow-xl hover:scale-110 transition-all z-50 bg-primary hover:bg-primary/90"
      >
        <Bot className="h-6 w-6" />
      </Button>
    </div>
  )
}
