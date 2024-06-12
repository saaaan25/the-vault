// providers/AuthProvider.tsx
/*
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react"
import { redirect, usePathname, useRouter } from "next/navigation"

interface AuthContextType {
  user: any
  login: (user: any) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!user && router.pathname !== "/login") {
      redirect("/login")
    }
  }, [user, router])

  const login = (user: any) => {
    setUser(user)
    redirect("/contents")
  }

  const logout = () => {
    setUser(null)
    router.push("/login")
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}*/
