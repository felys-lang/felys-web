import { choose } from "@/utils/helper";
import Editor, { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { Dispatch, SetStateAction } from "react";

const config = (_: editor.IStandaloneCodeEditor, monaco: Monaco) => {
  monaco.languages.register({ id: "felys" });

  monaco.languages.setMonarchTokensProvider("felys", {
    keywords: [
      "if",
      "elif",
      "else",
      "while",
      "return",
      "如果",
      "否如",
      "否则",
      "循环",
      "返回",
    ],
    tokenizer: {
      root: [
        [/[a-zA-Z_][\w_]*(?=\s*\()/, "function.call"],
        [/[_\u4e00-\u9fa5]+(?=\s*（)/, "function.call"],

        [/__elysia__/, "elysia"],
        [/——爱莉希雅——/, "elysia"],

        [
          /[a-zA-Z_][\w_]*/,
          {
            cases: {
              "@keywords": "keyword",
              "@default": "identifier",
            },
          },
        ],
        [
          /[_\u4e00-\u9fa5]+/,
          {
            cases: {
              "@keywords": "keyword",
              "@default": "identifier",
            },
          },
        ],

        [/\d+/, "number"],
        [/"/, "string", "@string"],
        [/“.*?”/, "string"],
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
  lang: string;
  code: {
    EN: string;
    ZH: string;
  };
  setCode: Dispatch<
    SetStateAction<{
      EN: string;
      ZH: string;
    }>
  >;
}

const VSEditor = ({ lang, code, setCode }: Props) => {
  return (
    <main className="h-[calc(100vh-84px)]">
      <Editor
        loading={<div className="loader" />}
        options={{
          fontSize: 16,
          scrollBeyondLastLine: false,
          scrollbar: { horizontal: "hidden" },
          unicodeHighlight: {
            ambiguousCharacters: false,
          },
        }}
        defaultLanguage="felys"
        value={choose(lang, code.EN, code.ZH)}
        onMount={config}
        onChange={(c) => {
          lang === "en"
            ? setCode({ EN: c || "", ZH: code.ZH })
            : setCode({ EN: code.EN, ZH: c || "" });
        }}
      />
    </main>
  );
};

export default VSEditor;
