import React, { useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";

const FileDropZone: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const options: DropzoneOptions = {
    accept: { "application/zip": [".zip"] },
    maxFiles: 1,
    onDrop: (acceptedFiles, fileRejections) => {
      setError(null);

      if (fileRejections.length > 0) {
        setError("Only ZIP files are accepted.");
        return;
      }

      setFile(acceptedFiles[0]);
    },
  };

  const { getRootProps, getInputProps } = useDropzone(options);

  return (
    <div
      {...getRootProps()}
      className="bg-white/30 p-24 border-2 border-dashed border-blue-500 rounded-3xl cursor-pointer"
    >
      <input {...getInputProps()} />
      {file ? (
        <p>
          Fichier déposé : <strong>{file.name}</strong>
        </p>
      ) : (
        <p>Drop your Quillpad backup .zip file here</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FileDropZone;
