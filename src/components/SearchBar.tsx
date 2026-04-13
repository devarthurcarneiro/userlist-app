interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  resultCount: number
}

export function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-xl">
      {/* Ícone de busca */}
      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
        <svg
          className="h-4 w-4 text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar por nome..."
        className="
          w-full rounded-xl border border-ink-700 bg-ink-800
          py-3 pl-11 pr-4
          font-body text-sm text-gray-200
          placeholder:text-muted
          outline-none
          transition-all duration-200
          focus:border-accent focus:ring-2 focus:ring-accent/20
        "
      />

      {/* Contador de resultados */}
      {value && (
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
          <span className="font-mono text-xs text-muted">
            {resultCount} resultado{resultCount !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </div>
  )
}
