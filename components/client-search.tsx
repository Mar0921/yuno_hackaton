"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, X } from "lucide-react"

interface ClientSearchProps {
  userRole: "sales" | "technical"
}

export function ClientSearch({ userRole }: ClientSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const salesFilters = ["Recent meeting", "Active opportunity", "Active contract", "High priority"]
  const technicalFilters = ["Active error", "Recent change", "Improvement", "Pending documentation"]

  const availableFilters = userRole === "sales" ? salesFilters : technicalFilters

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const clearFilters = () => {
    setSelectedFilters([])
  }

  return (
    <Card className="p-6 border border-border">
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search client by name, company or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {selectedFilters.length > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                {selectedFilters.length}
              </span>
            )}
          </Button>
        </div>

        {showFilters && (
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-foreground">Available filters</h4>
              {selectedFilters.length > 0 && (
                <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-foreground">
                  Clear filters
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {availableFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    selectedFilters.includes(filter)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {filter}
                  {selectedFilters.includes(filter) && <X className="inline-block ml-1 h-3 w-3" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedFilters.length > 0 && (
          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground mb-3">Active filters:</p>
            <div className="flex flex-wrap gap-2">
              {selectedFilters.map((filter) => (
                <span key={filter} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-lg">
                  {filter}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
