// store/preferences-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PrefsState = {
  theme: "light" | "dark" | "system";
  coursesView: "grid" | "list";
  setTheme: (t: PrefsState["theme"]) => void;
  setCoursesView: (v: PrefsState["coursesView"]) => void;
};

export const usePrefsStore = create<PrefsState>()(
  persist(
    (set) => ({
      theme: "system",
      coursesView: "grid",
      setTheme: (theme) => set({ theme }),
      setCoursesView: (coursesView) => set({ coursesView }),
    }),
    { name: "user-prefs" } // localStorage key
  )
);