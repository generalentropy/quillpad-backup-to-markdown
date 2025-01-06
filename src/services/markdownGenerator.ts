import { v4 as uuidv4 } from "uuid";

/**
 * Generate Markdown files from notes.
 *
 * @param {Object} data - The JSON object containing notes and notebooks.
 * @returns {Array<{ filename: string, content: string }>}
 *   An array of objects with the filename and content for each note.
 */
export function generateMarkdownFiles(data) {
  const { notes, notebooks } = data;

  // Map to associate notebook IDs with their names
  const notebookMap = new Map(notebooks.map((nb) => [nb.id, nb.name]));

  return notes.map((note) => {
    const title = note.title || `unnamed-${uuidv4()}`;
    const notebookName = notebookMap.get(note.notebookId) || "Unknown Notebook";
    const attachments = note.attachments
      ? note.attachments
          .map((att) => `- [${att.description}](${att.fileName})`)
          .join("\n")
      : "";

    // Generate Markdown content
    const content = `# ${note.title || "Unnamed Note"}

**Notebook:** ${notebookName}

## Content
${note.content || "No content provided"}

## Attachments
${attachments || "No attachments"}
`;

    return { filename: `${title}.md`, content };
  });
}
