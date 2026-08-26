import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ACTIVE_LOGO, logoUrl as logoUrlFor } from './config'

export type LogoId = 1 | 2 | 3 | 4 | 5 | 6

const LOGO_COUNT = 6
const STORAGE_KEY = 'ulc-logo-id'

type LogoContextValue = {
  logoId: LogoId
  logoSrc: string
  cycleLogo: () => void
  setLogoId: (id: LogoId) => void
}

const LogoContext = createContext<LogoContextValue | null>(null)

function parseLogoId(value: string | null): LogoId | null {
  if (!value) return null
  const n = Number(value)
  if (n >= 1 && n <= LOGO_COUNT) return n as LogoId
  return null
}

function nextLogoId(current: LogoId): LogoId {
  return ((current % LOGO_COUNT) + 1) as LogoId
}

export function LogoProvider({ children }: { children: ReactNode }) {
  const [logoId, setLogoIdState] = useState<LogoId>(ACTIVE_LOGO)

    useEffect(() => {
    const stored = parseLogoId(localStorage.getItem(STORAGE_KEY))
    if (stored) setLogoIdState(stored)

    for (let i = 1; i <= LOGO_COUNT; i++) {
      const img = new Image()
      img.src = logoUrlFor(i as LogoId)
    }
  }, [])

  const setLogoId = useCallback((id: LogoId) => {
    setLogoIdState(id)
    localStorage.setItem(STORAGE_KEY, String(id))
  }, [])

  const cycleLogo = useCallback(() => {
    setLogoIdState((current) => {
      const next = nextLogoId(current)
      localStorage.setItem(STORAGE_KEY, String(next))
      return next
    })
  }, [])

  const value = useMemo(
    () => ({
      logoId,
      logoSrc: logoUrlFor(logoId),
      cycleLogo,
      setLogoId,
    }),
    [logoId, cycleLogo, setLogoId],
  )

  return <LogoContext.Provider value={value}>{children}</LogoContext.Provider>
}

export function useLogo() {
  const ctx = useContext(LogoContext)
  if (!ctx) throw new Error('useLogo must be used within LogoProvider')
  return ctx
}
