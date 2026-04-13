import { User } from '../types/user'

interface UserCardProps {
  user: User
  index: number
  onClick: (user: User) => void
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('')
}

// Gera uma cor consistente por ID de usuário para o avatar
const AVATAR_COLORS = [
  'from-emerald-500 to-teal-600',
  'from-violet-500 to-purple-600',
  'from-amber-400 to-orange-500',
  'from-sky-400 to-blue-600',
  'from-rose-400 to-pink-600',
  'from-cyan-400 to-teal-500',
  'from-lime-400 to-green-500',
  'from-indigo-400 to-violet-600',
  'from-fuchsia-400 to-purple-500',
  'from-orange-400 to-red-500',
]

export function UserCard({ user, index, onClick }: UserCardProps) {
  const colorClass = AVATAR_COLORS[user.id % AVATAR_COLORS.length]

  return (
    <button
      onClick={() => onClick(user)}
      className="
        card-hover group w-full cursor-pointer
        rounded-2xl border border-ink-700 bg-ink-800
        p-5 text-left
        outline-none focus-visible:ring-2 focus-visible:ring-accent/50
      "
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start gap-4">
        {/* Avatar com iniciais */}
        <div
          className={`
            flex h-12 w-12 flex-shrink-0 items-center justify-center
            rounded-full bg-gradient-to-br ${colorClass}
            font-display text-sm font-bold text-white shadow-lg
          `}
        >
          {getInitials(user.name)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-semibold text-gray-100 group-hover:text-accent transition-colors duration-200 truncate">
            {user.name}
          </p>
          <p className="mt-0.5 font-mono text-xs text-muted truncate">
            {user.email}
          </p>
        </div>

        {/* Seta de ação */}
        <svg
          className="h-4 w-4 flex-shrink-0 text-muted opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-accent group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Informações extras */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-700 bg-ink-900 px-3 py-1 font-mono text-xs text-muted">
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4" />
          </svg>
          {user.company.name}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-700 bg-ink-900 px-3 py-1 font-mono text-xs text-muted">
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          </svg>
          {user.address.city}
        </span>
      </div>
    </button>
  )
}
