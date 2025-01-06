import JSZip from "jszip";

/**
 * Extracts a JSON file and "media" folder from a ZIP archive.
 * - Parses and returns the JSON content.
 * - Returns the files in the "media" folder.
 * @param {File | Blob} zipFile - The ZIP file to process.
 * @returns {Promise<{ jsonContent: Object, mediaFiles: Map<string, Blob> }>}
 *   - `jsonContent`: The parsed JSON data.
 *   - `mediaFiles`: A Map of files from the "media" folder (name -> Blob).
 */

export async function extractZip(zipFile: File) {
  const zip = new JSZip();

  const zipContent = await zip.loadAsync(zipFile);

  let notes = null;
  const mediaFiles = new Map();

  for (const fileName in zipContent.files) {
    const fileData = zipContent.files[fileName];

    if (!fileData.dir) {
      if (fileName.endsWith(".json")) {
        const jsonString = await fileData.async("string");
        notes = JSON.parse(jsonString);
      } else if (fileName.startsWith("media/")) {
        const fileBlob = await fileData.async("blob");
        mediaFiles.set(fileName, fileBlob);
      }
    }
  }

  if (!notes) {
    throw new Error("No JSON found");
  }

  return { notes, mediaFiles };
}
