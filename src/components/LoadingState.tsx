export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-ink-700 bg-ink-800 p-5">
      <div className="flex items-start gap-4">
        {/* Avatar skeleton */}
        <div className="skeleton h-12 w-12 rounded-full flex-shrink-0" />

        <div className="flex-1 space-y-2">
          {/* Nome */}
          <div className="skeleton h-4 w-3/4 rounded-md" />
          {/* Email */}
          <div className="skeleton h-3 w-1/2 rounded-md" />
        </div>
      </div>

      {/* Tags skeleton */}
      <div className="mt-4 flex gap-2">
        <div className="skeleton h-6 w-20 rounded-full" />
        <div className="skeleton h-6 w-24 rounded-full" />
      </div>
    </div>
  )
}

export function LoadingState() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
