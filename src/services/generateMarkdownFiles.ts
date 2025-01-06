import { v4 as uuidv4 } from "uuid";
import { Data } from "../types/types";

/**
 * Generate Markdown files from notes.
 *
 * @param {Object} data - The JSON object containing notes and notebooks.
 * @returns {Array<{ filename: string, content: string, notebookId : number }>}
 *   An array of objects with the filename and content for each note.
 */
export function generateMarkdownFiles(data: Data) {
  const { notes, notebooks } = data;

  return notes.map((note) => {
    const title = note.title || `unnamed-${uuidv4()}`;
    const notebookId = note.notebookId || null;
    const notebookName = notebooks.find((nb) => nb.id === notebookId);

    const attachments = note.attachments
      ? note.attachments
          .map((att) => `- [${att.description}](${att.fileName})`)
          .join("\n")
      : "";

    // Generate Markdown content
    const content = `# ${note.title || "Unnamed Note"}

**Notebook:** ${notebookName || ""}

## Content
${note.content || "No content"}

## Attachments
${attachments || "No attachments"}
`;

    return { name: `${title}.md`, content, notebookId };
  });
}
