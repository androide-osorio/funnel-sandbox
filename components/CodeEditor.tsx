import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import CodeMirror from "@uiw/react-codemirror";
import { githubLight } from "@uiw/codemirror-theme-github";
import { nord } from "@uiw/codemirror-theme-nord";
import { json } from "@codemirror/lang-json";

interface CodeEditorProps {
	code: string;
	language: string;
	editable?: boolean;
	onChange?: (newCode: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, language, editable = false, onChange }) => {
  const isDarkMode = useMediaQuery({ query: "(prefers-color-scheme: dark)" });
  const theme = isDarkMode ? nord : githubLight;

  return (
    <CodeMirror
      value={code}
      className="max-h-screen overflow-y-auto"
      extensions={[json()]}
      onChange={onChange}
      editable={editable}
      theme={theme}
    />
  );
};

export default CodeEditor;