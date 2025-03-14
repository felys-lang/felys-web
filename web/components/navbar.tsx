"use client";
import Link from "next/link";
import { CloseIcon, CollectionIcon, ExecIcon } from "@/components/icons";
import { Codebase, Result, SetCodebase, SetResult } from "./alias";
import { useState } from "react";

interface Props {
  codebase: Codebase;
  setCodebase: SetCodebase;
}

export default function Navbar({ codebase, setCodebase }: Props) {
  const [modal, setModal] = useState(false);
  const [result, setResult] = useState<Result | undefined>(undefined);

  return (
    <header className="flex justify-between py-4 px-4 lg:px-6 border-b-2 border-black">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">
          <Link href="/" className="text-elysia">
            Felys
          </Link>
        </h1>
        <Link
          href="https://github.com/felys-lang/felys"
          target="_blank"
          className="font-medium"
        >
          GitHub
        </Link>
        <Link href="https://felys.dev" target="_blank" className="font-medium">
          Docs
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <button className="lg:hidden" onClick={() => setModal((m) => !m)}>
          <CollectionIcon />
        </button>
        <button
          onClick={() => executeCode(codebase.code[codebase.cursor], setResult)}
        >
          <ExecIcon />
        </button>
      </div>
      {modal && (
        <dialog
          open
          className="h-screen w-screen fixed top-0 z-20 flex justify-center items-center bg-black/50"
        >
          <ul className="max-h-[60vh] w-64 space-y-4 overflow-auto">
            {codebase.name.map((value, key) => (
              <li key={key} className="text-lg font-bold text-neutral-300">
                <button
                  className={`p-2 w-full border-neutral-300 border-x-2 bg-neutral-${
                    codebase.cursor === key ? "800" : "900"
                  }`}
                  onClick={() => {
                    setCodebase((cb) => ({ ...cb, cursor: key }));
                    setModal(false);
                  }}
                >
                  {value}.ely
                </button>
              </li>
            ))}
          </ul>
        </dialog>
      )}
      {result && (
        <dialog
          open
          className="max-h-[40vh] w-screen fixed bottom-0 z-10 p-4 overflow-auto text-neutral-300 bg-neutral-900 border-t-2 border-black"
        >
          <div className="flex justify-between items-center">
            <code className="font-bold">Felys 0.2.1</code>
            <button onClick={() => setResult(undefined)}>
              <CloseIcon />
            </button>
          </div>

          <br />

          <div className="whitespace-pre-wrap">
            <code>{result?.result}</code>
          </div>

          <br />

          <div className="whitespace-pre-wrap">
            <code>{`Finished in ${result?.elapsed}`}</code>
          </div>
        </dialog>
      )}
    </header>
  );
}

const executeCode = async (code: string, setResult: SetResult) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/execute`, {
    method: "POST",
    body: code,
  }).catch((e) => console.log(e));

  if (response && response.ok) {
    const result: Result = await response.json();
    setResult(result);
  } else {
    setResult({ elapsed: "N/A", result: "Internal Server Error" });
  }
};
