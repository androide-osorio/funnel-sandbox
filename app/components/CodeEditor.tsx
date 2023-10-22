import React, { useState } from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

interface CodeEditorProps {
	code: string;
	language: string;
	editable?: boolean;
	onChange?: (newCode: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, language, editable = false, onChange }) => {
  return (
    <CodeMirror
      value={code}
      height="200px"
      extensions={[json()]}
      onChange={onChange}
    />
  );
};

export default CodeEditor;
