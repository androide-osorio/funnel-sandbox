import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

type Props = {
  onFileUpload: (files: File[]) => void;
  accept?: string;
};

/**
 * The FileLoader component allows users to upload files by dragging and dropping them onto the component.
 */
export function FileLoader({ onFileUpload, accept }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFileUpload(acceptedFiles);
    },
    [onFileUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="dark:bg-slate-700 hover:dark:bg-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer rounded-2xl w-[80vw] md:w-[50vw] h-[33vh] flex flex-col gap-2 items-center justify-center py-8 px-4 min-h-[200px] text-center"
    >
      <input {...getInputProps({ accept })} data-testid="file-input" />
      <ArrowUpTrayIcon className="inline-block w-1/3 h-1/3" />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drop some files here, or click to select files</p>
      )}
    </div>
  );
}
