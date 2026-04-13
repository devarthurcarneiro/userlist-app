import { User } from '../types/user'
import { UserCard } from './UserCard'

interface UserListProps {
  users: User[]
  onUserClick: (user: User) => void
  searchQuery: string
}

export function UserList({ users, onUserClick, searchQuery }: UserListProps) {
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-ink-700 bg-ink-800">
          <svg
            className="h-8 w-8 text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
            />
          </svg>
        </div>
        <div>
          <p className="font-display text-base font-semibold text-gray-400">
            Nenhum usuário encontrado
          </p>
          <p className="mt-1 font-body text-sm text-muted">
            Tente buscar por outro nome.{' '}
            <span className="font-mono text-accent">"{searchQuery}"</span> não retornou resultados.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user, index) => (
        <div key={user.id} className="animate-fadeUp opacity-0" style={{ animationFillMode: 'forwards', animationDelay: `${index * 60}ms` }}>
          <UserCard user={user} index={index} onClick={onUserClick} />
        </div>
      ))}
    </div>
  )
}
