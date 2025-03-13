"use client";
import Editor, { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { Codebase, Modifier } from "./alias";

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

interface Props {
  codebase: Codebase;
  modifier: Modifier;
}

export default function Workbench({ codebase, modifier }: Props) {
  return (
    <div className="flex h-[calc(100vh-98px)] relative">
      <div className="hidden w-1/5 lg:block border-e-2 border-black">
        <ul>
          {codebase.name.map((value, key) => (
            <li key={key}>
              <button
                className="py-2 px-4 w-full text-start hover:bg-neutral-700"
                onClick={() => modifier((cb) => ({ ...cb, cursor: key }))}
              >
                {value}.ely
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
          value={codebase.code[codebase.cursor]}
          onChange={(c) =>
            modifier((cb) => {
              cb.code[cb.cursor] = c || "";
              return { ...cb, code: cb.code };
            })
          }
        />
      </div>
    </div>
  );
}
