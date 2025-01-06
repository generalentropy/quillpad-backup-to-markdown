import React, { useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { useFileStore } from "../store/FileStore";
import { RiDragDropLine } from "react-icons/ri";
import clsx from "clsx";

const FileDropZone: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const setFile = useFileStore((state) => state.setFile);

  const file = useFileStore((state) => state.file);
  const [error, setError] = useState<string | null>(null);

  const options: DropzoneOptions = {
    accept: { "application/zip": [".zip"] },
    maxFiles: 1,
    onDrop: (acceptedFiles, fileRejections) => {
      setError(null);
      setIsHovered(false);

      if (fileRejections.length > 0) {
        setError("Wrong format, only ZIP files are accepted.");
        return;
      }

      setFile(acceptedFiles[0]);
    },
    onDragEnter: () => setIsHovered(true),
    onDragLeave: () => setIsHovered(false),
  };

  const { getRootProps, getInputProps } = useDropzone(options);

  return (
    <div
      {...getRootProps()}
      className={clsx(
        "flex h-full max-h-[300px] min-h-[200px] w-full max-w-[600px] cursor-pointer flex-col items-center justify-center rounded-3xl border-4 border-dashed border-blue-500 bg-white/30 transition-colors",
        { "bg-blue-400/20": isHovered },
      )}
    >
      <input {...getInputProps()} />
      {file ? (
        <div className="flex flex-col">
          <p>
            Your file : <strong>{file.name}</strong>
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-center text-xl text-blue-500">
          <RiDragDropLine size={60} />
          <p className="font-bold">Drop your backup file here (.zip)</p>
        </div>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default FileDropZone;
