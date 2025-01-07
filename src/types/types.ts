export interface FileStore {
  file: File | null;
  setFile: (file: File | null) => void;
  sortByNotebookName: boolean;
  setSortByNotebookName: () => void;
  removeMedia: boolean;
  setRemoveMedia: () => void;
}

export type Attachment = {
  type: string;
  description: string;
  fileName: string;
};

export type Note = {
  title: string;
  content: string;
  attachments?: Attachment[];
  notebookId: number;
  notebookName?: string | null;
};

export type Notebook = {
  id: number;
  name: string;
};

export interface JSONFile {
  name: string;
  content: Record<string, unknown>;
}

export interface TextFile {
  name: string;
  content: string;
  notebookId: number | null;
}

export interface Data {
  notes: Note[];
  notebooks: Notebook[];
}
