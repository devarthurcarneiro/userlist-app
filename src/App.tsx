import { useState, useMemo, useCallback } from 'react'
import { useUsers } from './hooks/useUsers'
import { User } from './types/user'
import { SearchBar } from './components/SearchBar'
import { UserList } from './components/UserList'
import { UserModal } from './components/UserModal'
import { LoadingState } from './components/LoadingState'
import { ErrorState } from './components/ErrorState'

export function App() {
  const { users, loading, error } = useUsers()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Filtra usuários pelo nome (case-insensitive)
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users
    const q = searchQuery.toLowerCase().trim()
    return users.filter((u) => u.name.toLowerCase().includes(q))
  }, [users, searchQuery])

  const handleUserClick = useCallback((user: User) => {
    setSelectedUser(user)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedUser(null)
  }, [])

  // Para retry: recarregar a página (solução simples e válida para o desafio)
  const handleRetry = useCallback(() => {
    window.location.reload()
  }, [])

  return (
    <div className="min-h-screen bg-ink-950 font-body">
      {/* Gradiente decorativo no topo */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-64 bg-gradient-to-b from-accent/5 to-transparent" />

      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-ink-700" />
            <span className="font-mono text-xs text-muted uppercase tracking-widest">
              JSONPlaceholder API
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-ink-700" />
          </div>

          <h1 className="font-display text-4xl font-extrabold text-gray-50 sm:text-5xl glow-text">
            Usuários
          </h1>
          <p className="mt-2 font-body text-base text-muted">
            Clique em um usuário para ver seus detalhes completos.
          </p>

          {/* Contador geral */}
          {!loading && !error && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs text-accent">
                {users.length} usuários carregados
              </span>
            </div>
          )}
        </header>

        {/* Barra de busca */}
        {!loading && !error && (
          <div className="mb-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              resultCount={filteredUsers.length}
            />
          </div>
        )}

        {/* Conteúdo principal */}
        {loading && <LoadingState />}

        {error && !loading && (
          <ErrorState message={error} onRetry={handleRetry} />
        )}

        {!loading && !error && (
          <UserList
            users={filteredUsers}
            onUserClick={handleUserClick}
            searchQuery={searchQuery}
          />
        )}
      </div>

      {/* Modal */}
      <UserModal user={selectedUser} onClose={handleCloseModal} />
    </div>
  )
}
