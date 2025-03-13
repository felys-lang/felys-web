import Link from "next/link";
import { Collection, Exec } from "@/components/icons";

export default function Navbar() {
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
