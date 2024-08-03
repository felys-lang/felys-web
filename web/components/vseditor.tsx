import Editor, { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { Dispatch, SetStateAction, useState } from "react";

const config = (_: editor.IStandaloneCodeEditor, monaco: Monaco) => {
  monaco.editor.defineTheme("felys-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#1b1b1f",
    },
  });
  monaco.editor.setTheme("felys-dark");
};

interface Props {
  code: String;
  setCode: Dispatch<SetStateAction<string>>;
}

const VSEditor = ({ code, setCode }: Props) => {
  return (
    <main className="h-[calc(100vh-80px)]">
      <Editor
        loading={<span className="text-elypink">Loading...</span>}
        options={{
          fontSize: 16,
          scrollBeyondLastLine: false,
          scrollbar: { horizontal: "hidden" },
        }}
        onMount={config}
        onChange={(c) => {
          setCode(c || "");
        }}
      />
    </main>
  );
};

export default VSEditor;
