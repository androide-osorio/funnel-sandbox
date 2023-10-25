import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FileLoader } from "./FileLoader";

describe("FileLoader", () => {
	it("calls onFileUpload with selected files", async () => {
		const onFileUpload = jest.fn();
		const accept = "image/*";
		render(<FileLoader onFileUpload={onFileUpload} accept={accept} />);
		const file1 = new File(["test file content"], "test1.png", { type: "image/png" });
		const file2 = new File(["test file content"], "test2.png", { type: "image/png" });
		const fileInput = screen.getByTestId('file-input');
		await act(() => userEvent.upload(fileInput, [file1, file2]));
		expect(onFileUpload).toHaveBeenCalledWith([file1, file2]);
	});
});