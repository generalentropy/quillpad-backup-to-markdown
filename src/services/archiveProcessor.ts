import JSZip from "jszip";
import { Data } from "../types/types";

/**
 * Extracts a JSON file and optionally the "media" folder from a ZIP archive.
 * - Parses and returns the JSON content (notes and notebooks).
 * - Returns the files in the "media" folder only if `includeMedia` is true.
 *
 * @param {File | Blob} zipFile - The ZIP file to process.
 * @param {boolean} removeMedia - Flag to determine whether to extract media files.
 * @returns {Promise<{ data: Data; mediaFiles: Map<string, Blob> }>}
 *   - `data`: The parsed JSON data containing notes and notebooks.
 *   - `mediaFiles`: A Map of files from the "media" folder (name -> Blob) if `includeMedia` is true; otherwise, an empty Map.
 */
export async function extractZip(
  zipFile: File,
  removeMedia: boolean,
): Promise<{ data: Data; mediaFiles: Map<string, Blob> }> {
  const zip = new JSZip();

  const zipContent = await zip.loadAsync(zipFile);

  let data: Data | null = null;
  const mediaFiles = new Map<string, Blob>();

  for (const fileName in zipContent.files) {
    const fileData = zipContent.files[fileName];

    if (!fileData.dir) {
      if (fileName.endsWith(".json")) {
        const jsonString = await fileData.async("string");
        data = JSON.parse(jsonString) as Data;
      } else if (!removeMedia && fileName.startsWith("media/")) {
        const fileBlob = await fileData.async("blob");
        mediaFiles.set(fileName, fileBlob);
      }
    }
  }

  if (!data) {
    throw new Error("No JSON found in the ZIP archive.");
  }

  // Optional: Validate that both notes and notebooks are present
  if (!data.notes || !Array.isArray(data.notes)) {
    throw new Error("JSON does not contain a valid 'notes' array.");
  }

  if (!data.notebooks || !Array.isArray(data.notebooks)) {
    throw new Error("JSON does not contain a valid 'notebooks' array.");
  }

  return { data, mediaFiles };
}
