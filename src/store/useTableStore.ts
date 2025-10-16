import { create } from "zustand";

interface UseTableStore {
  isChange: boolean;
  setIsChange: (v: boolean) => void;
}

export const useTableStore = create<UseTableStore>((set) => ({
  isChange: false,
  setIsChange: (v) => set({ isChange: v }),
}));
