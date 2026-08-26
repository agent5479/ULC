import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

type EnquiryContextValue = {
  message: string
  setMessage: (value: string) => void
  applyPrintBrief: (brief: string) => void
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null)

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('')

  const applyPrintBrief = useCallback((brief: string) => {
    setMessage(brief)
    requestAnimationFrame(() => {
      const el = document.getElementById('contact')
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.setTimeout(() => {
        document.getElementById('enquiry-message')?.focus()
      }, 400)
    })
  }, [])

  const value = useMemo(
    () => ({ message, setMessage, applyPrintBrief }),
    [message, applyPrintBrief],
  )

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext)
  if (!ctx) throw new Error('useEnquiry must be used within EnquiryProvider')
  return ctx
}
