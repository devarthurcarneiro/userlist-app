interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      {/* Ícone de erro */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-red-800/60 bg-red-950/30">
        <svg
          className="h-10 w-10 text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
          />
        </svg>
      </div>

      <div className="space-y-1">
        <p className="font-display text-lg font-semibold text-red-400">
          Algo deu errado
        </p>
        <p className="font-body text-sm text-muted">{message}</p>
      </div>

      <button
        onClick={onRetry}
        className="
          rounded-xl border border-ink-700 bg-ink-800
          px-6 py-2.5
          font-body text-sm font-medium text-gray-200
          transition-all duration-200
          hover:border-accent hover:text-accent
        "
      >
        Tentar novamente
      </button>
    </div>
  )
}
