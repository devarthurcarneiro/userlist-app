import { useEffect } from 'react'
import { User } from '../types/user'

interface UserModalProps {
  user: User | null
  onClose: () => void
}

interface DetailRowProps {
  icon: React.ReactNode
  label: string
  value: string
}

function DetailRow({ icon, label, value }: DetailRowProps) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-ink-700 last:border-0">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-ink-700 text-accent">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-mono text-xs text-muted">{label}</p>
        <p className="mt-0.5 font-body text-sm text-gray-200 break-words">{value}</p>
      </div>
    </div>
  )
}

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

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('')
}

export function UserModal({ user, onClose }: UserModalProps) {
  // Fechar com ESC
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Bloquear scroll do body quando modal está aberto
  useEffect(() => {
    if (user) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [user])

  if (!user) return null

  const colorClass = AVATAR_COLORS[user.id % AVATAR_COLORS.length]

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {/* Painel do modal */}
      <div className="animate-modalIn w-full max-w-md rounded-2xl border border-ink-700 bg-ink-900 shadow-2xl">
        {/* Header */}
        <div className="relative flex items-center gap-4 p-6 pb-5">
          {/* Avatar grande */}
          <div
            className={`
              flex h-16 w-16 flex-shrink-0 items-center justify-center
              rounded-2xl bg-gradient-to-br ${colorClass}
              font-display text-xl font-bold text-white shadow-xl
            `}
          >
            {getInitials(user.name)}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="font-display text-xl font-bold text-gray-100 leading-tight">
              {user.name}
            </h2>
            <p className="font-mono text-xs text-accent mt-0.5">@{user.username}</p>
          </div>

          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="
              flex h-8 w-8 flex-shrink-0 items-center justify-center
              rounded-lg border border-ink-700 bg-ink-800
              text-muted transition-all duration-200
              hover:border-red-800 hover:bg-red-950/40 hover:text-red-400
            "
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Divisor */}
        <div className="h-px bg-gradient-to-r from-transparent via-ink-700 to-transparent" />

        {/* Detalhes */}
        <div className="p-6 pt-4">
          <DetailRow
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
              </svg>
            }
            label="E-mail"
            value={user.email}
          />
          <DetailRow
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            }
            label="Telefone"
            value={user.phone}
          />
          <DetailRow
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4" />
              </svg>
            }
            label="Empresa"
            value={user.company.name}
          />
          <DetailRow
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              </svg>
            }
            label="Cidade"
            value={`${user.address.city} — ${user.address.street}`}
          />
          <DetailRow
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z" />
              </svg>
            }
            label="Website"
            value={user.website}
          />
        </div>

        {/* Rodapé */}
        <div className="border-t border-ink-700 p-4">
          <p className="text-center font-mono text-xs text-muted italic">
            "{user.company.catchPhrase}"
          </p>
        </div>
      </div>
    </div>
  )
}
