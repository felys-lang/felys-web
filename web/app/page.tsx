import Bench from "@/components/bench";
import { Exec } from "@/components/icons";
import Image from "next/image";
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
    <header className="flex justify-between py-4 px-6 border-b-2 border-black">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">
          <Link href="/" className="text-elysia">
            Felys
          </Link>
        </h1>
        <Link
          href="https://github.com/felys-lang/felys"
          target="_blank"
          className="text-neutral-100 font-medium"
        >
          GitHub
        </Link>
        <Link
          href="https://felys.dev"
          target="_blank"
          className="text-neutral-100 font-medium"
        >
          Docs
        </Link>
      </div>
      <button>
        <Exec />
      </button>
    </header>
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
