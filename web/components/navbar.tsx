import { Output } from "@/app/page";
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/execute`, {
    method: "POST",
    body: code,
  }).catch((e) => console.log(e));

  if (response && response.ok) {
    const result: Output = await response.json();
    setOutput(result);
  } else {
    setOutput({ elapsed: "N/A", result: "Internal Server Error" });
  }
};

const Navbar = ({ code, setOutput }: Props) => {
  return (
    <nav className="p-2 px-6 mb-1">
      <ul className="flex justify-between">
        <li className="flex items-center space-x-5">
          <h1 className="flex items-center">
            <Link href="/" className="text-elypink text-lg font-medium">
              Felys Web
            </Link>
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
        <li className="flex items-center space-x-3">
          <button onClick={() => executeCode(code, setOutput)}>
            <ExecIcon />
          </button>
        </li>
      </ul>
    </nav>
  );
};

const ExecIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      fill="#ffc6f5"
      viewBox="0 0 16 16"
    >
      <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z" />
    </svg>
  );
};

export default Navbar;
