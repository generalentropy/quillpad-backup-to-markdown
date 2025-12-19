import React, { useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { useFileStore } from "../store/FileStore";
import { RiDragDropLine } from "react-icons/ri";
import clsx from "clsx";

const FileDropZone: React.FC = () => {
  const setFile = useFileStore((state) => state.setFile);

  const file = useFileStore((state) => state.file);
  const [error, setError] = useState<string | null>(null);

  const options: DropzoneOptions = {
    accept: { "application/zip": [".zip"] },
    maxFiles: 1,

    onDrop: (acceptedFiles, fileRejections) => {
      setError(null);

      if (fileRejections.length > 0) {
        setError("Wrong format, only ZIP files are accepted.");
        return;
      }

      setFile(acceptedFiles[0]);
    },
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone(options);

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={clsx(
          "flex h-auto min-h-[300px] w-full max-w-[632px] cursor-pointer flex-col items-center justify-center rounded-3xl border-4 border-dashed border-blue-500 transition-colors",
          { "bg-blue-600/20": isDragActive, "bg-white/30": !isDragActive },
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
          <div className="flex flex-col items-center gap-2 px-2 text-center text-xl text-blue-500">
            <RiDragDropLine size={60} />
            <p className="font-bold">Drop your backup file here (.zip)</p>
          </div>
        )}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default FileDropZone;
