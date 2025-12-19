import JSZip from "jszip";
import { Data } from "../types/types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

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
        const parsed: unknown = JSON.parse(jsonString);

        // Some exports contain multiple JSON files; pick the one that looks like
        // a Quillpad backup (must contain a notes array).
        if (
          isRecord(parsed) &&
          Array.isArray((parsed as Record<string, unknown>).notes)
        ) {
          // parsed has at least notes[], notebooks may be absent (handled below)
          data = parsed as unknown as Data;
        }
      } else if (!removeMedia && fileName.startsWith("media/")) {
        const fileBlob = await fileData.async("blob");
        mediaFiles.set(fileName, fileBlob);
      }
    }
  }

  if (!data) {
    throw new Error("No JSON found in the ZIP archive.");
  }

  // Validate notes are present
  if (!data.notes || !Array.isArray(data.notes)) {
    throw new Error("JSON does not contain a valid 'notes' array.");
  }

  // Some backups don't contain notebooks at all (or contain something else).
  // In that case, default to an empty list so conversion still works.
  if (!("notebooks" in data) || !Array.isArray(data.notebooks)) {
    data.notebooks = [];
  }

  return { data, mediaFiles };
}
