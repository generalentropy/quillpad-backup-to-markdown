import JSZip from "jszip";
import { JSONFile, TextFile } from "../types/types";

/**
 * Creates a ZIP archive containing JSON files and other files.
 *
 * @param {JSONFile[]} jsonFiles - A list of JSON objects with their filenames.
 *    Example: [{ name: "file1.json", content: { key: "value" } }]
 * @param {TextFile[]} otherFiles - A list of other files with their filenames and textual content.
 *    Example: [{ name: "readme.md", content: "# Title" }]
 * @returns {Promise<Blob>} A Blob representing the generated ZIP archive.
 */
export async function createZipArchive(
  jsonFiles: JSONFile[],
  otherFiles: TextFile[],
): Promise<Blob> {
  const zip = new JSZip();

  jsonFiles.forEach(({ name, content }) => {
    const jsonString = JSON.stringify(content, null, 2); // Beautify JSON
    zip.file(name, jsonString);
  });

  otherFiles.forEach(({ name, content }) => {
    zip.file(name, content);
  });

  const zipBlob = await zip.generateAsync({ type: "blob" });
  return zipBlob;
}
