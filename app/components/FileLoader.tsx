import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

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
		<div {...getRootProps()}>
			<input {...getInputProps({ accept })} />
			{isDragActive ? (
				<p>Drop the files here ...</p>
			) : (
				<p>Drop some files here, or click to select files</p>
			)}
		</div>
	);
}

export default FileLoader;
