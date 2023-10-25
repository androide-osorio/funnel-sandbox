import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, Tab } from "./Tabs";

describe("Tabs", () => {
	it("renders horizontal tabs", () => {
		const onChange = jest.fn();
		const tab1 = "Tab 1";
		const tab2 = "Tab 2";
		render(
			<Tabs variant="horizontal" onChange={onChange}>
				<Tab value="tab1">{tab1}</Tab>
				<Tab value="tab2">{tab2}</Tab>
			</Tabs>
		);
		const tab1Element = screen.getByRole("tab", { name: tab1 });
		const tab2Element = screen.getByRole("tab", { name: tab2 });
		expect(tab1Element).toBeInTheDocument();
		expect(tab2Element).toBeInTheDocument();
	});

	it("renders vertical tabs", () => {
		const onChange = jest.fn();
		const tab1 = "Tab 1";
		const tab2 = "Tab 2";
		render(
			<Tabs variant="vertical" onChange={onChange}>
				<Tab value="tab1">{tab1}</Tab>
				<Tab value="tab2">{tab2}</Tab>
			</Tabs>
		);
		const tab1Element = screen.getByRole("tab", { name: tab1 });
		const tab2Element = screen.getByRole("tab", { name: tab2 });
		expect(tab1Element).toBeInTheDocument();
		expect(tab2Element).toBeInTheDocument();
	});

	it("triggers callback when clicking on the tabs", async () => {
		const onChange = jest.fn();
		const tab1 = "Tab 1";
		const tab2 = "Tab 2";
		render(
			<Tabs variant="vertical" onChange={onChange}>
				<Tab value="tab1">{tab1}</Tab>
				<Tab value="tab2">{tab2}</Tab>
			</Tabs>
		);
		const tab2Element = screen.getByRole("tab", { name: tab2 });
		await act(() => userEvent.click(tab2Element));
		expect(onChange).toHaveBeenCalledWith("tab2");
	});
});