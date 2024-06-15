'use client'

import { SunIcon, MoonIcon } from "@heroicons/react/16/solid"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeSwitch() {
  const [ mounted, setMounted ] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true),[])

  if (!mounted) return (
    <MoonIcon className="w-8 h-8 cursor-pointer" onClick={() => setTheme('dark')}/>
  )

  if (resolvedTheme === 'dark') {
    return (
    <SunIcon className="w-8 h-8 cursor-pointer" onClick={() => setTheme('light')}/>
    )
  }

  if (resolvedTheme === 'light') {
    return (
    <MoonIcon className="w-8 h-8 cursor-pointer" onClick={() => setTheme('dark')}/>
    )
  }
}