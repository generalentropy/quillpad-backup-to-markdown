import JSZip from "jszip";

/**
 * Create a ZIP file from a list of Markdown files.
 *
 * @param {Array<{ filename: string, content: string }>} markdownFiles
 *   An array of objects with filename and content.
 */
export async function generateZip(markdownFiles) {
  const zip = new JSZip();

  // Add each Markdown file to the ZIP
  markdownFiles.forEach(({ filename, content }) => {
    zip.file(filename, content);
  });

  // Generate the ZIP file as a Blob
  const zipBlob = await zip.generateAsync({ type: "blob" });

  // Trigger the download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(zipBlob);
  link.download = "notes.zip";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Revoke the URL to free memory
  URL.revokeObjectURL(link.href);
}
