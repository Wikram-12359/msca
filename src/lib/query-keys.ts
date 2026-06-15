// lib/query-keys.ts
export const queryKeys = {
  session: ["session"] as const,

  // Admin
  admin: {
    students: (page: number) => ["admin", "students", page] as const,
    courses: ["admin", "courses"] as const,
    teachers: ["admin", "teachers"] as const,
    meetings: ["admin", "meetings"] as const,
  },

  // Courses
  courses: {
    all: ["courses"] as const,
    list: (filters?: Record<string, unknown>) => ["courses", "list", filters] as const,
    detail: (id: string) => ["courses", "detail", id] as const,
  },

  // Meetings
  meetings: {
    all: ["meetings"] as const,
    detail: (id: string) => ["meetings", id] as const,
  },

  // Student-specific
  student: {
    courses: ["student", "courses"] as const,
    meetings: ["student", "meetings"] as const,
  },

  // Teacher-specific
  teacher: {
    meetings: ["teacher", "meetings"] as const,
    courses: ["teacher", "courses"] as const,
  },
} as const;