import { create } from "zustand";
interface UseTableStore {
  searchUser: string;
  setSearchUser: (v: string) => void;
}

export const useTableStore = create<UseTableStore>((set) => ({
  searchUser: "",
  setSearchUser: (v) => set({ searchUser: v }),
}));
