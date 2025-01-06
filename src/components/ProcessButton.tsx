import { FaDownload } from "react-icons/fa";
import { useFileStore } from "../store/FileStore";
import { extractZip } from "../services/archiveProcessor";
import { useState } from "react";
import { RiLoader4Fill } from "react-icons/ri";
import { generateMarkdownFiles } from "../services/markdownGenerator";
import { generateZip } from "../services/zipGenerator";

export default function ProcessButton() {
  const [isProcessing, setIsProcessing] = useState(false);
  const file = useFileStore((state) => state.file);

  const handleClick = async () => {
    setIsProcessing(true);
    if (!file) return;

    const { notes } = await extractZip(file);
    const notesArray = generateMarkdownFiles(notes);
    generateZip(notesArray);

    setIsProcessing(false);
  };

  return (
    <div className="my-6">
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
    </div>
  );
}
