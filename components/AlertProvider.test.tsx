import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { AlertProvider, useAlert } from "./AlertProvider";

describe("AlertProvider", () => {
  it("shows alert when showAlert is called", async () => {
    const TestComponent = () => {
      const { showAlert } = useAlert();
      return (
        <button onClick={() => showAlert({ message: "Test Alert" })}>
          Show Alert
        </button>
      );
    };
    await render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>
    );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(buttonElement);
    });
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toHaveTextContent("Test Alert");
  });

  it("hides alert after timeout", async () => {
    jest.useFakeTimers();
    const TestComponent = () => {
      const { showAlert } = useAlert();
      return (
        <button onClick={() => showAlert({ message: "Test Alert" })}>
          Show Alert
        </button>
      );
    };
    await render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>
    );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(buttonElement);
    });

    const alertElement = screen.getByRole("alert");
    expect(alertElement).toHaveTextContent("Test Alert");

		await act(() => {
			jest.advanceTimersByTime(11000);
		})
    expect(alertElement).not.toBeInTheDocument();
  });
});
