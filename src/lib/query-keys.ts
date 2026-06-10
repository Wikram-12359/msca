// lib/query-keys.ts
export const queryKeys = {
  // courses
  courses: {
    all: ["courses"] as const,
    list: (filters?: Record<string, unknown>) => ["courses", "list", filters] as const,
    detail: (id: string) => ["courses", "detail", id] as const,
  },
  // users
  users: {
    all: ["users"] as const,
    detail: (id: string) => ["users", id] as const,
  },
  // session (if not using authClient.useSession)
  session: ["session"] as const,
} as const;