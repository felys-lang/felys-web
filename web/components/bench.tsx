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

export default function Bench() {
  return (
    <div className="flex h-[calc(100vh-96px)]">
      <div className="hidden w-1/5 lg:block border-e-2 border-black">
        <ul className="py-2">
          {["foo.ely", "bar.ely", "fuzz.ely"].map((value, key) => (
            <li key={key}>
              <button className="py-2 px-4 w-full text-start text-neutral-100 hover:bg-neutral-700">
                {value}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full lg:w-4/5">
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
      </div>
    </div>
  );
}
