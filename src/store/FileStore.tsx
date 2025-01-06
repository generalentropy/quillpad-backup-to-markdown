import { create } from "zustand";

interface FileStore {
  file: File | null;
  setFile: (file: File | null) => void;
  extractedData: JSON | null;
  setExtractedData: (file: JSON | null) => void;
}

export const useFileStore = create<FileStore>((set) => ({
  file: null,
  setFile: (file) => set({ file }),
  extractedData: null,
  setExtractedData: (extractedData) => set({ extractedData }),
}));
