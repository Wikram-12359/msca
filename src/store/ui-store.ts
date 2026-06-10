// store/ui-store.ts
import { create } from "zustand";

type UIState = {
  activePage: string | null;
  setActivePage: (name:string) => void;
};

export const useUIStore = create<UIState>((set) => ({
  activePage: null,
  setActivePage: (name) => set(() => ({ activePage: name })),
}));