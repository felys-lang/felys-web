import Editor, { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";

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

const VSEditor = () => {
  return (
    <main className="h-[calc(100vh-80px)]">
      <Editor
        loading={<span className="text-elypink">Loading...</span>}
        options={{ fontSize: 16, scrollBeyondLastLine: false }}
        onMount={config}
      />
    </main>
  );
};

export default VSEditor;
