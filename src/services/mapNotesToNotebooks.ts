import { Note, Notebook } from "../types/types";

export function notebookToFolder(
  note: Note,
  notebooks: Notebook[],
): string | undefined {
  const nbName = notebooks.find((nb) => nb.id === note.notebookId);

  return nbName?.name;
}
