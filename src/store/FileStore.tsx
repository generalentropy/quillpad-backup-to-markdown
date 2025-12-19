import { create } from "zustand";
import { FileStore } from "../types/types";

export const useFileStore = create<FileStore>((set) => ({
  file: null,
  setFile: (file) => set({ file }),
  sortByNotebookName: false,
  setSortByNotebookName: () =>
    set((state) => ({ sortByNotebookName: !state.sortByNotebookName })),
  removeMedia: false,
  setRemoveMedia: () => set((state) => ({ removeMedia: !state.removeMedia })),
  displayImagesInline: false,
  setDisplayImagesInline: () =>
    set((state) => ({ displayImagesInline: !state.displayImagesInline })),
}));
