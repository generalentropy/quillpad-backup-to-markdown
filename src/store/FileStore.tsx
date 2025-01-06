import { create } from "zustand";
import { FileStore } from "../types/types";

export const useFileStore = create<FileStore>((set) => ({
  file: null,
  setFile: (file) => set({ file }),
  sortByNotebookName: false,
  setSortByNotebookName: () =>
    set((state) => ({ sortByNotebookName: !state.sortByNotebookName })),
}));
