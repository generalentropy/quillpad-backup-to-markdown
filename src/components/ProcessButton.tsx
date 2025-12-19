import { FaDownload } from "react-icons/fa";
import { useFileStore } from "../store/FileStore";
import { extractZip } from "../services/archiveProcessor";
import { useState } from "react";
import { RiLoader4Fill } from "react-icons/ri";
import { generateMarkdownFiles } from "../services/generateMarkdownFiles";
import { generateArchive } from "../services/generateArchive";

export default function ProcessButton() {
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const file = useFileStore((state) => state.file);
  const sortByFolders = useFileStore((state) => state.sortByNotebookName);
  const removeMedia = useFileStore((state) => state.removeMedia);
  const displayImagesInline = useFileStore(
    (state) => state.displayImagesInline,
  );

  const isFileLoaded = file !== null;

  const handleClick = async () => {
    setError("");
    setIsProcessing(true);
    try {
      if (!file) {
        setError("No file selected");
        return;
      }
      const { data, mediaFiles } = await extractZip(file, removeMedia);
      const mdNotesArray = generateMarkdownFiles(data, { displayImagesInline });
      await generateArchive(
        mdNotesArray,
        mediaFiles,
        removeMedia,
        data.notebooks,
        sortByFolders,
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return isFileLoaded ? (
    <div className="my-6 text-center">
      <button
        disabled={isProcessing || !isFileLoaded}
        onClick={handleClick}
        className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-4 font-bold text-blue-200 transition-colors hover:bg-blue-500 hover:text-blue-100 disabled:cursor-not-allowed disabled:bg-blue-400 disabled:opacity-50 disabled:hover:bg-blue-400"
      >
        {isProcessing ? (
          <RiLoader4Fill className="mx-2 animate-spin" size={25} />
        ) : (
          <FaDownload className="mx-2" size={25} />
        )}
        <span>Convert and download</span>
      </button>

      <p className="my-4 h-8 text-red-700">{error && `Error: ${error}`}</p>
    </div>
  ) : null;
}
