import { useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  name?: string
  role: 'USER' | 'ADMIN'
  preferences?: any
}

interface Session {
  token: string
  expires: Date
}

interface SessionState {
  user: User | null
  session: Session | null
  isLoading: boolean
}

export function useSession() {
  const [state, setState] = useState<SessionState>({
    user: null,
    session: null,
    isLoading: true,
  })

  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken')
    if (sessionToken) {
      // Validate session
      fetch('/api/auth/session', {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setState({
              user: data.user,
              session: data.session,
              isLoading: false,
            })
          } else {
            localStorage.removeItem('sessionToken')
            setState({ user: null, session: null, isLoading: false })
          }
        })
        .catch(() => {
          localStorage.removeItem('sessionToken')
          setState({ user: null, session: null, isLoading: false })
        })
    } else {
      setState({ user: null, session: null, isLoading: false })
    }
  }, [])

  return state
} 