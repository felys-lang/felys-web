import MEditor from "@/components/editor";
import { Collection, Exec } from "@/components/icons";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <Bench />
      <Footer />
    </>
  );
}

function Navbar() {
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
        <button className="lg:hidden">
          <Collection />
        </button>
        <button>
          <Exec />
        </button>
      </div>
    </header>
  );
}

function Bench() {
  return (
    <div className="flex h-[calc(100vh-98px)] relative">
      <div className="hidden w-1/5 lg:block border-e-2 border-black">
        <ul>
          {["foo.ely", "bar.ely", "fuzz.ely"].map((value, key) => (
            <li key={key}>
              <button className="py-2 px-4 w-full text-start hover:bg-neutral-700">
                {value}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full lg:w-4/5">
        <MEditor />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="p-2">
      <p className="text-center text-sm text-neutral-400">
        © All rights reserved by FelysNeko
      </p>
    </footer>
  );
}
