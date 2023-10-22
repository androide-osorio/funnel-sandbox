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
      className="max-h-screen overflow-y-auto"
      extensions={[json()]}
      onChange={onChange}
      editable={editable}
    />
  );
};

export default CodeEditor;
