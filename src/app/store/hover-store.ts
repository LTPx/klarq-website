import { create } from "zustand";

interface HoverStore {
  isHoveringCard: boolean;
  setIsHoveringCard: (value: boolean) => void;
}

export const useHoverStore = create<HoverStore>((set) => ({
  isHoveringCard: false,
  setIsHoveringCard: (value) => set({ isHoveringCard: value }),
}));
