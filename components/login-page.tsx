"use client"

import { Button } from "@/components/ui/button"

interface LoginPageProps {
  onLogin: (role: "sales" | "technical") => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-[#e2e8f1] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
              <svg className="h-6 w-6 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">Welcome to Effort</h1>
          <p className="text-lg text-muted-foreground">Intelligent management of clients and technical documentation</p>
        </div>

        <div className="space-y-4">
          <Button onClick={() => onLogin("sales")} className="w-full" size="lg">
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <Button onClick={() => onLogin("technical")} variant="outline" className="w-full" size="lg">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.07 16.21c-.5 0-.92-.4-.92-.9V7.44c0-.5.42-.9.92-.9s.92.4.92.9v7.87c0 .5-.42.9-.92.9z"/>
              <path d="M19.32 10.14c-.5 0-.92-.4-.92-.9V4.77c0-.5.42-.9.92-.9s.92.4.92.9v4.47c0 .5-.42.9-.92.9z"/>
              <path d="M16.79 13.71c-.5 0-.92-.4-.92-.9V2.2c0-.5.42-.9.92-.9s.92.4.92.9v10.61c0 .5-.42.9-.92.9z"/>
              <path d="M14.26 16.21c-.5 0-.92-.4-.92-.9V7.44c0-.5.42-.9.92-.9s.92.4.92.9v7.87c0 .5-.42.9-.92.9z"/>
              <path d="M11.74 13.71c-.5 0-.92-.4-.92-.9V4.77c0-.5.42-.9.92-.9s.92.4.92.9v7.94c0 .5-.42.9-.92.9z"/>
              <path d="M9.21 16.21c-.5 0-.92-.4-.92-.9V2.2c0-.5.42-.9.92-.9s.92.4.92.9v13.11c0 .5-.42.9-.92.9z"/>
              <path d="M6.69 13.71c-.5 0-.92-.4-.92-.9V7.44c0-.5.42-.9.92-.9s.92.4.92.9v5.37c0 .5-.42.9-.92.9z"/>
              <path d="M4.16 10.14c-.5 0-.92-.4-.92-.9V4.77c0-.5.42-.9.92-.9s.92.4.92.9v4.47c0 .5-.42.9-.92.9z"/>
              <path d="M1.64 16.21c-.5 0-.92-.4-.92-.9V7.44c0-.5.42-.9.92-.9s.92.4.92.9v7.87c0 .5-.42.9-.92.9z"/>
            </svg>
            Continue with Outlook
          </Button>
        </div>
      </div>
    </div>
  )
}
