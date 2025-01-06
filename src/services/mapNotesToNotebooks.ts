import { Note, Notebook } from "../types/types";

/**
 * Maps each note to its corresponding notebook by matching notebookId with the notebooks list.
 * If no match is found, it assigns `null` to the notebookName.
 *
 * @param notes - Array of notes containing notebookId.
 * @param notebooks - Array of notebooks with id and name.
 * @returns Array of notes enriched with the notebookName or null.
 */
export function mapNotesToNotebooks(
  notes: Note[],
  notebooks: Notebook[],
): Note[] {
  return notes.map((note) => {
    const notebook = notebooks.find((nb) => nb.id === note.notebookId);
    return {
      ...note,
      notebookName: notebook ? notebook.name : null,
    };
  });
}
