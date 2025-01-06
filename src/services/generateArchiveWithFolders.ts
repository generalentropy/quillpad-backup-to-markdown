import JSZip from "jszip";
import { Notebook, TextFile } from "../types/types";
import { getFormattedDate } from "../utils/helpers";
import { v4 as uuidv4 } from "uuid";

export async function generateArchiveWithFolders(
  markdownFiles: TextFile[],
  notebooks: Notebook[],
): Promise<void> {
  const zip = new JSZip();

  // Organize files into folders based on their notebook
  markdownFiles.forEach(({ name, content, notebookId }) => {
    const folderName = notebooks.find((nb) => nb.id === notebookId)?.name;
    if (folderName) {
      // Add file to the appropriate folder
      zip.folder(folderName)?.file(name, content);
    } else {
      // Add file to the root if no notebook is found
      zip.file(name, content);
    }
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
