import { Output } from "@/app/page";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface Props {
  code: string;
  setOutput: Dispatch<SetStateAction<Output | undefined>>;
}

const executeCode = async (
  code: string,
  setOutput: Dispatch<SetStateAction<Output | undefined>>
) => {
  const response = await fetch("http://localhost:8000/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: code, lang: "en" }),
  }).catch((e) => console.log(e));

  if (response && response.ok) {
    const result: Output = await response.json();
    setOutput(result);
  } else {
    setOutput({ out: "", msg: "Internal Server Error", ok: false });
  }
};

const Navbar = ({ code, setOutput }: Props) => {
  return (
    <nav className="p-2 px-6">
      <ul className="flex justify-between">
        <li className="flex items-center space-x-6">
          <h1 className="text-elypink text-lg font-medium">
            <Link href="/">Felys Playground</Link>
          </h1>
          <h1 className="text-white">
            <Link href="https://github.com/felys-lang/felys" target="_blank">
              GitHub
            </Link>
          </h1>
          <h1 className="text-white">
            <Link href="https://felys.dev" target="_blank">
              Docs
            </Link>
          </h1>
        </li>
        <li className="flex items-center">
          <button onClick={() => executeCode(code, setOutput)}>
            <Image src="/exec.svg" alt="EXEC" width={28} height={28} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
