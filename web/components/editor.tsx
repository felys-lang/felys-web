"use client";
import Editor, { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";

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
      "editor.background": "#171717",
    },
  });

  monaco.editor.setTheme("felys-dark");
};

export default function MEditor() {
  return (
    <Editor
      options={{
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        scrollbar: { horizontal: "hidden" },
      }}
      defaultLanguage="felys"
      onMount={config}
    />
  );
}
