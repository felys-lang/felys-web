import { example } from "@/constant/code";
import Editor, { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { Dispatch, SetStateAction } from "react";

const config = (_: editor.IStandaloneCodeEditor, monaco: Monaco) => {
  monaco.languages.register({ id: "felys" });

  monaco.languages.setMonarchTokensProvider("felys", {
    keywords: ["if", "elif", "else", "while", "return"],
    tokenizer: {
      root: [
        [/[a-z_$][\w$]*(?=\s*\()/, "function.call"],
        [/__elysia__/, 'elysia'],
        [
          /[a-z_$][\w$]*/,
          {
            cases: {
              "@keywords": "keyword",
              "@default": "identifier",
            },
          },
        ],
        [/\d+/, "number"],
        [/"/, "string", "@string"],
        [/[;,.]/, "delimiter"],
      ],
      string: [
        [/[^\\"]+/, "string"],
        [/\\./, "string.escape.invalid"],
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
  setCode: Dispatch<SetStateAction<string>>;
}

const VSEditor = ({ setCode }: Props) => {
  return (
    <main className="h-[calc(100vh-80px)]">
      <Editor
        loading={<div className="loader" />}
        options={{
          fontSize: 16,
          scrollBeyondLastLine: false,
          scrollbar: { horizontal: "hidden" },
        }}
        defaultLanguage="felys"
        defaultValue={example}
        onMount={config}
        onChange={(c) => {
          setCode(c || "");
        }}
      />
    </main>
  );
};

export default VSEditor;
