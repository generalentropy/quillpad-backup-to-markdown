import { v4 as uuidv4 } from "uuid";
import { Data } from "../types/types";

function normalizeAttachmentHref(
  fileName: string,
  options: { includeFolders: boolean },
): string {
  // If it's already a path/URL, keep it as-is (except media path adjustment for folders)
  if (
    fileName.startsWith("http://") ||
    fileName.startsWith("https://") ||
    fileName.startsWith("data:") ||
    fileName.startsWith("blob:")
  ) {
    return fileName;
  }

  // If export already stored "media/..." in JSON, keep it, but adjust relative path
  if (fileName.startsWith("media/")) {
    return options.includeFolders ? `../${fileName}` : fileName;
  }
  if (fileName.startsWith("./media/")) {
    const cleaned = fileName.slice(2); // remove "./"
    return options.includeFolders ? `../${cleaned}` : cleaned;
  }
  if (fileName.startsWith("../media/")) {
    return fileName;
  }

  // Default: media files are stored under "media/" in the output zip
  return options.includeFolders ? `../media/${fileName}` : `media/${fileName}`;
}

function isImageAttachment(att: { type?: string; fileName?: string }): boolean {
  if (att.type && att.type.startsWith("image/")) return true;

  const fileName = att.fileName?.toLowerCase() ?? "";
  return (
    fileName.endsWith(".png") ||
    fileName.endsWith(".jpg") ||
    fileName.endsWith(".jpeg") ||
    fileName.endsWith(".gif") ||
    fileName.endsWith(".webp") ||
    fileName.endsWith(".svg") ||
    fileName.endsWith(".bmp") ||
    fileName.endsWith(".tif") ||
    fileName.endsWith(".tiff") ||
    fileName.endsWith(".avif")
  );
}

/**
 * Generate Markdown files from notes.
 * @param {Object} data - The JSON object containing notes and notebooks.
 * @returns {Array<{ name: string, content: string, notebookId: number | null }>}
 *   An array of objects with the filename and content for each note.
 */
export function generateMarkdownFiles(
  data: Data,
  options?: { displayImagesInline?: boolean; includeFolders?: boolean },
) {
  const { notes, notebooks } = data;
  const displayImagesInline = options?.displayImagesInline ?? false;
  const includeFolders = options?.includeFolders ?? false;

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

    const attachments = note.attachments ?? [];
    const attachmentsMarkdown =
      attachments.length > 0
        ? attachments
            .map((att) => {
              const label = att.description ?? att.fileName;
              const href = normalizeAttachmentHref(att.fileName, {
                includeFolders,
              });

              if (displayImagesInline && isImageAttachment(att)) {
                // No list dash for images, so they render cleanly inline in most viewers.
                return `![${label}](${href})`;
              }

              return `- [${label}](${href})`;
            })
            .join("\n")
        : "";

    // Générer le contenu Markdown
    const content = `# ${note.title || "Unnamed Note"}

**Notebook:** ${notebookName}


${note?.content ?? ""}

## Attachments
${attachmentsMarkdown || "No attachments"}
`;

    return { name: `${title}.md`, content, notebookId };
  });
}
