import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="p-2 px-6">
      <ul className="flex justify-between">
        <li className="flex items-center space-x-6">
          <h1 className="text-elypink text-lg font-medium">
            <Link href="/">Felys Playground</Link>
          </h1>
          <h1 className="text-white">
            <Link href="/">Docs</Link>
          </h1>
        </li>
        <li className="flex items-center">
          <button>
            <Image src="/exec.svg" alt="EXEC" width={28} height={28} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
