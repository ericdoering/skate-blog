"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {}

function SearchBar({ className, ...props }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = React.useState(searchParams.get("q") || "")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set("q", value)
    } else {
      params.delete("q")
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex justify-center w-full mb-10">
      <input
        type="text"
        placeholder="Search for a product"
        value={searchQuery}
        onChange={handleSearch}
        className={cn(
          "w-full max-w-xs h-9 px-4 py-2 rounded-md",
          "bg-background border border-input",
          "text-sm text-black",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { SearchBar }

