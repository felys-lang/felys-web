"use client";
import { Editor } from "@monaco-editor/react";

export default function Bench() {
  return (
    <div className="flex h-[calc(100vh-96px)]">
      <div className="hidden w-1/5 lg:block border-e-2 border-black">
        <ul className="py-2">
          {["foo.ely", "bar.ely", "fuzz.ely"].map((value, _) => (
            <li>
              <button className="p-2 w-full text-start hover:bg-slate-200">
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
        />
      </div>
    </div>
  );
}
