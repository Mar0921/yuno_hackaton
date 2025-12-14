"use client"

import { useState, useRef, useEffect } from "react"
import { generateDashboardConfig } from "@/app/actions/ai-dashboard"
import { ChartRenderer } from "./chart-renderer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Bot, Send, Loader2, Sparkles, User, Clock } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

interface Message {
    id: string
    role: "user" | "assistant"
    content: string
}

interface DashboardEntry {
    id: string
    query: string
    timestamp: Date
    config: any
    businessAnswer?: string
}

export function DynamicDashboardAndChat() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '0', role: 'assistant', content: 'Soy Yuno Context Core. Pídeme cualquier análisis de negocio o visualización. Los resultados se guardarán aquí.' }
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [dashboardHistory, setDashboardHistory] = useState<DashboardEntry[]>([])
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const dashboardEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const scrollToDashboardBottom = () => {
        // Small delay to allow react render
        setTimeout(() => {
            dashboardEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        scrollToDashboardBottom()
    }, [dashboardHistory])

    // Auto-initialize dashboard with Zoop Context
    useEffect(() => {
        const initDashboard = async () => {
            // Avoid double init if already populated (optional check)
            if (dashboardHistory.length > 0) return;

            const initialPrompt = "Genera el Dashboard General del Merchant Overview. Incluye los KPIs principales, los gráficos de ingresos y ventas por categoría, y los resúmenes de reuniones con sus tags y detalles.";

            // We manually inject the user message 'state' but don't strictly need to show it in the chat history 
            // if we want it to feel 'native', but showing it puts context provided by user.
            // Let's show it as a system welcome or similar.

            setIsLoading(true);
            try {
                const response = await generateDashboardConfig(initialPrompt);
                if (response.display_config) {
                    const newEntry: DashboardEntry = {
                        id: 'init-0', // special ID
                        query: "Dashboard General: Merchant Overview", // Display text for the history item
                        timestamp: new Date(),
                        config: response.display_config,
                        businessAnswer: response.business_answer
                    }
                    setDashboardHistory([newEntry]);
                    setMessages(prev => [...prev, {
                        id: 'init-response',
                        role: 'assistant',
                        content: response.chat_message || "He cargado el estado actual de Zoop basado en la información disponible."
                    }]);
                }
            } catch (e) {
                console.error("Auto-init failed", e);
            } finally {
                setIsLoading(false);
            }
        };

        // Small delay to ensure mount
        const timer = setTimeout(initDashboard, 500);
        return () => clearTimeout(timer);
    }, []);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return

        const userMsg = input
        setInput("")
        const newMsg: Message = { id: Date.now().toString(), role: 'user', content: userMsg }
        setMessages(prev => [...prev, newMsg])
        setIsLoading(true)

        try {
            const response = await generateDashboardConfig(userMsg)

            // Log for verification in Browser Console
            console.log("----- FRONTEND RECEIVED DATA -----");
            console.log("Prompt:", userMsg);
            console.log("Response:", response);
            if (response.display_config) {
                console.log("Display Config:", response.display_config);
                console.log("Chart Data:", response.display_config.data);
            }
            console.log("----------------------------------");

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response.chat_message || response.business_answer || "Información generada."
            }
            setMessages(prev => [...prev, aiMsg])

            if (response.display_config) {
                const newEntry: DashboardEntry = {
                    id: Date.now().toString(),
                    query: userMsg,
                    timestamp: new Date(),
                    config: response.display_config,
                    businessAnswer: response.business_answer
                }
                setDashboardHistory(prev => [...prev, newEntry])
            }

        } catch (error) {
            console.error(error)
            setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: "Lo siento, hubo un error procesando tu solicitud." }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="h-[85vh] w-full border border-border/50 rounded-xl overflow-hidden bg-background/50 backdrop-blur-sm shadow-sm">
            <ResizablePanelGroup direction="horizontal">
                {/* Main Area: Dynamic Dashboard Feed */}
                <ResizablePanel defaultSize={70} minSize={30}>
                    <div className="flex flex-col h-full bg-card/30">
                        <div className="p-4 border-b border-border/50 flex justify-between items-center bg-muted/20">
                            <h2 className="font-semibold flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary" />
                                Historial de Análisis
                            </h2>
                            <span className="text-xs text-muted-foreground">{dashboardHistory.length} resultados</span>
                        </div>
                        <div className="h-full p-6 bg-secondary/20 overflow-y-auto">
                            {/* Render ONLY the last entry if exists, otherwise show empty state or loading */}
                            {dashboardHistory.length > 0 ? (
                                (() => {
                                    const entry = dashboardHistory[dashboardHistory.length - 1];
                                    return (
                                        <div className="max-w-5xl mx-auto space-y-6">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                                                    AI
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-foreground">
                                                        {entry.query}
                                                    </h3>
                                                    <span className="text-xs text-muted-foreground">
                                                        {entry.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </div>

                                            <Card className="p-6 border-border/60 shadow-sm transition-shadow relative overflow-hidden">
                                                {entry.businessAnswer && (
                                                    <div className="mb-6 p-4 bg-muted/40 rounded-lg border border-border/50">
                                                        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                                                            <Sparkles className="w-3 h-3 text-primary" />
                                                            Análisis de Negocio
                                                        </h4>
                                                        <div className="text-sm text-foreground/80 leading-relaxed space-y-2">
                                                            {entry.businessAnswer.split('\n').map((line, i) => {
                                                                const parts = line.split(/(\*\*.*?\*\*)/g);
                                                                return (
                                                                    <p key={i} className="min-h-[1em]">
                                                                        {parts.map((part, j) => {
                                                                            if (part.startsWith('**') && part.endsWith('**')) {
                                                                                return <strong key={j} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
                                                                            }
                                                                            return part;
                                                                        })}
                                                                    </p>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}

                                                <ChartRenderer config={entry.config} />
                                            </Card>
                                        </div>
                                    );
                                })()
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                                    <Sparkles className="h-12 w-12 mb-4 opacity-20" />
                                    <p>Iniciando AI Assistant...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* Side Area: Chat Interface */}
                <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
                    <div className="flex flex-col h-full bg-card/80 backdrop-blur-xl border-l border-border/50">
                        <div className="p-4 border-b border-border bg-muted/30">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                    <Bot className="h-5 w-5" />
                                </div>
                                <h3 className="font-semibold">Context Core AI</h3>
                            </div>
                        </div>

                        <ScrollArea className="flex-1 p-4">
                            <div className="space-y-4">
                                {messages.map((m) => (
                                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[90%] rounded-2xl p-3 text-sm ${m.role === 'user'
                                            ? 'bg-primary text-primary-foreground text-right ml-auto'
                                            : 'bg-muted text-foreground'
                                            }`}>
                                            {m.content}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-muted rounded-2xl p-3 flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            <span className="text-xs text-muted-foreground">Generando visualización...</span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </ScrollArea>

                        <div className="p-4 border-t border-border">
                            <div className="flex gap-2">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Escribe tu consulta..."
                                    disabled={isLoading}
                                    className="bg-background"
                                />
                                <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
