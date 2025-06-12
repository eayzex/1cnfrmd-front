"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative h-9 w-9 overflow-hidden rounded-full transition-all hover:bg-muted hover:scale-110"
    >
      <div className="relative h-full w-full">
        <motion.div
          initial={false}
          animate={{
            rotate: theme === "dark" ? 45 : 0,
            opacity: theme === "dark" ? 0 : 1,
            y: theme === "dark" ? -30 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            rotate: theme === "dark" ? 0 : -45,
            opacity: theme === "dark" ? 1 : 0,
            y: theme === "dark" ? 0 : 30,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="h-[1.2rem] w-[1.2rem] text-blue-400" />
        </motion.div>
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
