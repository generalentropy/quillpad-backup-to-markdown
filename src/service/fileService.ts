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

  // Charger le fichier ZIP
  const zipContent = await zip.loadAsync(zipFile);

  let jsonContent = null;
  const mediaFiles = new Map(); // Pour stocker les fichiers du dossier "media"

  // Parcourir les fichiers/dossiers dans le ZIP
  for (const fileName in zipContent.files) {
    const fileData = zipContent.files[fileName];

    if (!fileData.dir) {
      // Si c'est un fichier JSON
      if (fileName.endsWith(".json")) {
        const jsonString = await fileData.async("string");
        jsonContent = JSON.parse(jsonString); // Parser le JSON
      }
      // Si c'est un fichier dans le dossier "media/"
      else if (fileName.startsWith("media/")) {
        const fileBlob = await fileData.async("blob");
        mediaFiles.set(fileName, fileBlob); // Ajouter le fichier à la Map
      }
    }
  }

  if (!jsonContent) {
    throw new Error("Fichier JSON introuvable dans le ZIP.");
  }

  console.log({ jsonContent, mediaFiles });

  return { jsonContent, mediaFiles };
}
