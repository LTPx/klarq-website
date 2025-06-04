// src/stores/expandStore.ts
import { create } from "zustand";

interface ExpandStore {
  isExpandedReady: boolean;
  setIsExpandedReady: (value: boolean) => void;
}

export const useExpandStore = create<ExpandStore>((set) => ({
  isExpandedReady: false,
  setIsExpandedReady: (value) => set({ isExpandedReady: value }),
}));
