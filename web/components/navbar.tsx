"use client";
import Link from "next/link";
import { Collection, Exec } from "@/components/icons";
import { Codebase, SetCodebase } from "./alias";
import { useState } from "react";

interface Props {
  codebase: Codebase;
  setCodebase: SetCodebase;
}

export default function Navbar({ codebase, setCodebase }: Props) {
  const [modal, setModal] = useState(false);

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
          <Collection />
        </button>
        <button>
          <Exec />
        </button>
      </div>
      {modal && (
        <dialog className="h-screen w-screen fixed top-0 z-10 flex justify-center items-center bg-black/50">
          <ul className="max-h-[60vh] w-64 space-y-4 overflow-auto">
            {codebase.name.map((value, key) => (
              <li key={key} className="text-lg font-bold text-neutral-100">
                <button
                  className={`p-2 w-full border-neutral-100 border-x-2 bg-neutral-${
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
    </header>
  );
}
