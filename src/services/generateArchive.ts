import JSZip from "jszip";
import { TextFile } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import { getFormattedDate } from "../utils/helpers";

/**
 * Create a ZIP file from a list of Markdown files.
 *
 * @param {TextFile[]} markdownFiles - An array of objects with filename and content.
 * @returns {Promise<void>} - A promise that resolves when the ZIP file is downloaded.
 */
export async function generateArchive(
  markdownFiles: TextFile[],
): Promise<void> {
  const zip = new JSZip();

  // Add each Markdown file to the ZIP
  markdownFiles.forEach(({ name, content }) => {
    zip.file(name, content);
  });

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
