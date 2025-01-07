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

  const handleClick = async () => {
    setError(""); // Clear previous errors
    setIsProcessing(true);
    try {
      if (!file) {
        setError("No file selected");
        return;
      }
      const { data, mediaFiles } = await extractZip(file);
      const mdNotesArray = generateMarkdownFiles(data);
      await generateArchive(
        mdNotesArray,
        mediaFiles,
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

  return (
    <div className="my-6 text-center">
      <button
        disabled={isProcessing}
        onClick={handleClick}
        className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-4 font-bold text-blue-200 transition-colors hover:bg-blue-500 hover:text-blue-100"
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
  );
}
