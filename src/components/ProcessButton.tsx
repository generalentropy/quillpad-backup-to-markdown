import { FaDownload } from "react-icons/fa";
import { useFileStore } from "../store/FileStore";
import { extractZip } from "../service/fileService";

export default function ProcessButton() {
  const file = useFileStore((state) => state.file);

  const handleClick = () => {
    if (file) extractZip(file);
  };

  return (
    <div className="my-6">
      <button
        onClick={handleClick}
        className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-4 font-bold text-blue-200 transition-colors hover:bg-blue-500 hover:text-blue-100"
      >
        <FaDownload className="mx-2" />
        <span>Convert and download</span>
      </button>
    </div>
  );
}
