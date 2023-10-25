import React from "react";
import { render, screen } from "@testing-library/react";
import { Alert } from "./Alert";

describe("Alert", () => {
	it("renders without title", () => {
		const text = "This is an alert";
		render(<Alert text={text} />);
		const alertElement = screen.getByRole("alert");
		expect(alertElement).toHaveTextContent(text);
	});

	it("renders with title", () => {
		const title = "Alert Title";
		const text = "This is an alert";
		render(<Alert title={title} text={text} />);
		const alertElement = screen.getByRole("alert");
		expect(alertElement).toHaveTextContent(title);
		expect(alertElement).toHaveTextContent(text);
	});
});