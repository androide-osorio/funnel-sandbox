import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

type Props = {
	onFileUpload: (files: File[]) => void;
	accept?: string;
};

function FileLoader({ onFileUpload, accept }: Props) {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			console.log(acceptedFiles);
			onFileUpload(acceptedFiles);
		},
		[onFileUpload]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
    <div
      {...getRootProps()}
      className="dark:bg-slate-700 hover:dark:bg-slate-600 cursor-pointer rounded-2xl w-[50vmax] h-[33vh] flex flex-col gap-2 items-center justify-center"
    >
      <input {...getInputProps({ accept })} />
      <ArrowUpTrayIcon className="inline-block w-1/3 h-1/3" />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drop some files here, or click to select files</p>
      )}
    </div>
  );
}

export default FileLoader;
