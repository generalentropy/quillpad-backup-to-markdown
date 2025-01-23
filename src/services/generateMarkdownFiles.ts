import { v4 as uuidv4 } from "uuid";
import { Data } from "../types/types";

/**
 * Generate Markdown files from notes.
 *
 * @param {Object} data - The JSON object containing notes and notebooks.
 * @returns {Array<{ name: string, content: string, notebookId: number | null }>}
 *   An array of objects with the filename and content for each note.
 */
export function generateMarkdownFiles(data: Data) {
  const { notes, notebooks } = data;

  const titleCounts: Record<string, number> = {};

  return notes.map((note) => {
    let title = note.title || `unnamed-${uuidv4()}`;
    const notebookId = note.notebookId || null;
    const notebookName =
      notebooks.find((nb) => nb.id === notebookId)?.name || "";

    if (titleCounts[title]) {
      titleCounts[title]++;
      title = `${title}-${titleCounts[title]}`;
    } else {
      titleCounts[title] = 1;
    }

    const attachments = note.attachments
      ? note.attachments
          .map((att) => `- [${att.description}](${att.fileName})`)
          .join("\n")
      : "";

    // Générer le contenu Markdown
    const content = `# ${note.title || "Unnamed Note"}

**Notebook:** ${notebookName}


${note?.content ?? ""}

## Attachments
${attachments || "No attachments"}
`;

    return { name: `${title}.md`, content, notebookId };
  });
}
