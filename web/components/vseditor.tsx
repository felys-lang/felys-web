import Editor, { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { Dispatch, SetStateAction } from "react";

const config = (_: editor.IStandaloneCodeEditor, monaco: Monaco) => {
  monaco.languages.register({ id: "felys" });

  monaco.languages.setMonarchTokensProvider("felys", {
    tokenizer: {
      root: [
        [
          /if|else|while|break|continue|loop|return|true|false|none|and|or(?!\w)/,
          "keyword",
        ],
        [/[a-zA-Z_][\w_]*(?=\s*\()/, "function.call"],
        [/__elysia__/, "elysia"],

        [/[a-zA-Z_][\w_]*/, "identifier"],

        [/\d+/, "number"],
        [/"/, "string", "@string"],
      ],
      string: [
        [/[^"]+/, "string"],
        [/"/, "string", "@pop"],
      ],
    },
  });

  monaco.editor.defineTheme("felys-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "elysia", foreground: "#ffc6f5" },
      { token: "identifier", foreground: "#9cdcfe" },
      { token: "function.call", foreground: "#dcdcaa" },
    ],
    colors: {
      "editor.background": "#1b1b1f",
    },
  });

  monaco.editor.setTheme("felys-dark");
};

interface Props {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}

const VSEditor = ({ code, setCode }: Props) => {
  return (
    <main className="h-[calc(100vh-92px)]">
      <Editor
        loading={<div className="loader" />}
        options={{
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          scrollbar: { horizontal: "hidden" },
          unicodeHighlight: {
            ambiguousCharacters: false,
          },
        }}
        defaultLanguage="felys"
        value={code}
        onMount={config}
        onChange={(c) => setCode(c || "")}
      />
    </main>
  );
};

export default VSEditor;
