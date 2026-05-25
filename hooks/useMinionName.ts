'use client'

import { useState, useEffect } from 'react'

export function useMinionName() {
  const [minionName, setMinionNameState] = useState('YOUR MINION')

  useEffect(() => {
    const stored = localStorage.getItem('minionName')
    if (stored && stored.trim()) setMinionNameState(stored.trim().toUpperCase())
  }, [])

  const saveMinionName = (name: string) => {
    const upper = name.toUpperCase()
    localStorage.setItem('minionName', upper)
    setMinionNameState(upper || 'YOUR MINION')
  }

  return { minionName, saveMinionName }
}
