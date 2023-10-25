import React, {
  createContext,
  useState,
  useCallback,
  PropsWithChildren,
} from "react";

type HighlightBlockContextType = {
	currentBlock: string | null;
	highlightBlock: (block: string) => void;
	unhighlight: () => void;
};

export const HighlightBlockContext = createContext<HighlightBlockContextType>({
	currentBlock: null,
  highlightBlock: (blockId) => {},
  unhighlight: () => {},
});

export function HighlightBlockProvider({ children }: PropsWithChildren<{}>) {
  const [currentBlock, setCurrentBlock] = useState<string | null>(null);

  const highlightBlock = useCallback(
    (blockId: string) => {
      setCurrentBlock(blockId);
    },
    []
  );
  const unhighlight = useCallback(
    () => {
      setCurrentBlock(null);
    },
    []
  );

  return (
    <HighlightBlockContext.Provider value={{ currentBlock, highlightBlock, unhighlight }}>
      {children}
    </HighlightBlockContext.Provider>
  );
}

export const useHighlightBlock = () => {
  const context = React.useContext(HighlightBlockContext);

  if (!context) {
    throw new Error(
      "useHighlightBlock must be used within an HighlightBlockProvider"
    );
  }

  return context;
};
