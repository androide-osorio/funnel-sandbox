import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import {
  HighlightBlockProvider,
  useHighlightBlock,
} from "./HighlightBlockProvider";

describe("HighlightBlockProvider", () => {
  it("sets currentBlock to the provided blockId when highlightBlock is called", async () => {
    const TestComponent = () => {
      const { highlightBlock } = useHighlightBlock();
      return (
        <button onClick={() => highlightBlock("test-block")}>
          Highlight Block
        </button>
      );
    };
    await render(
      <HighlightBlockProvider>
        <TestComponent />
      </HighlightBlockProvider>,
    );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(buttonElement);
    });
    expect(screen.getByText("Current Block: test-block")).toBeInTheDocument();
  });

  it("sets currentBlock to null when unhighlight is called", async () => {
    const TestComponent = () => {
      const { highlightBlock, unhighlight } = useHighlightBlock();
      return (
        <>
          <button onClick={() => highlightBlock("test-block")}>
            Highlight Block
          </button>
          <button onClick={unhighlight}>Unhighlight</button>
        </>
      );
    };
    await render(
      <HighlightBlockProvider>
        <TestComponent />
      </HighlightBlockProvider>,
    );
    const highlightButtonElement = screen.getByText("Highlight Block");
    const unhighlightButtonElement = screen.getByText("Unhighlight");
    expect(highlightButtonElement).toBeInTheDocument();
    expect(unhighlightButtonElement).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(highlightButtonElement);
    });
    expect(screen.getByText("Current Block: test-block")).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(unhighlightButtonElement);
    });
    expect(screen.getByText("Current Block: null")).toBeInTheDocument();
  });
});
