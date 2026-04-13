import { useState, useEffect } from 'react'
import { User } from '../types/user'

interface UseUsersReturn {
  users: User[]
  loading: boolean
  error: string | null
}

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchUsers() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error(`Erro ao buscar usuários: ${response.status}`)
        }

        const data: User[] = await response.json()
        setUsers(data)
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return
        setError(
          err instanceof Error ? err.message : 'Erro desconhecido ao buscar dados.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()

    return () => controller.abort()
  }, [])

  return { users, loading, error }
}
