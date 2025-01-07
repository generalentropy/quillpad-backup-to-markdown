import JSZip from "jszip";
import { TextFile, Notebook } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import { getFormattedDate } from "../utils/helpers";

/**
 * Create a ZIP file from a list of Markdown files and media files, optionally organizing them into folders based on notebooks.
 *
 * @param {TextFile[]} markdownFiles - An array of objects with filename, content, and optionally notebookId.
 * @param {Map<string, Blob>} mediaFiles - A Map of media files (name -> Blob) to include in the "media" folder.
 * @param {Notebook[]} [notebooks] - An array of notebooks to organize files into folders. Required if includeFolders is true.
 * @param {boolean} [includeFolders=false] - Whether to organize files into folders based on notebooks.
 * @returns {Promise<void>} - A promise that resolves when the ZIP file is downloaded.
 */

export async function generateArchive(
  markdownFiles: TextFile[],
  mediaFiles: Map<string, Blob>,
  removeMedia: boolean,
  notebooks?: Notebook[],
  includeFolders: boolean = false,
): Promise<void> {
  const zip = new JSZip();

  if (includeFolders) {
    if (!notebooks) {
      throw new Error(
        "Notebooks must be provided when includeFolders is true.",
      );
    }

    // Organize files into folders based on their notebook
    markdownFiles.forEach(({ name, content, notebookId }) => {
      const folderName =
        notebooks.find((nb) => nb.id === notebookId)?.name || "No Folder";
      zip.folder(folderName)?.file(name, content);
    });
  } else {
    // Add each Markdown file to the root of the ZIP
    markdownFiles.forEach(({ name, content }) => {
      zip.file(name, content);
    });
  }

  if (!removeMedia && mediaFiles && mediaFiles.size > 0) {
    mediaFiles.forEach((blob, filePath) => {
      zip.file(filePath, blob);
    });
  }

  // Generate the ZIP file as a Blob
  const zipBlob = await zip.generateAsync({ type: "blob" });

  const date = getFormattedDate();

  // Trigger the download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(zipBlob);
  link.download = `converted_notes_${date}_${uuidv4()}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Revoke the URL to free memory
  URL.revokeObjectURL(link.href);
}
