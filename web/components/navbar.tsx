import { Output } from "@/app/page";
import { choose } from "@/utils/helper";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  code: {
    EN: string;
    ZH: string;
  };
  setOutput: Dispatch<SetStateAction<Output | undefined>>;
  lang: string;
  setLang: Dispatch<SetStateAction<string>>;
}

const executeCode = async (
  code: string,
  lang: string,
  setOutput: Dispatch<SetStateAction<Output | undefined>>
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: code, lang }),
  }).catch((e) => console.log(e));

  if (response && response.ok) {
    const result: Output = await response.json();
    setOutput(result);
  } else {
    setOutput({ time: "", out: "", msg: "Internal Server Error", ok: false });
  }
};

const Navbar = ({ code, setOutput, lang, setLang }: Props) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <nav className="p-2 px-6 mb-1">
      <ul className="flex justify-between">
        <li className="flex items-center space-x-5">
          <h1 className="flex items-center">
            <button
              className="sm:hidden me-2"
              onClick={() => setCollapse((c) => !c)}
            >
              <MoreIcon />
            </button>
            <Link href="/" className="text-elypink text-lg font-medium">
              {choose(lang, "Felys Playground", "FELYS在线运行")}
            </Link>
          </h1>
          <h1 className="text-white hidden sm:block">
            <Link href="https://github.com/felys-lang/felys" target="_blank">
              {choose(lang, "GitHub", "源码")}
            </Link>
          </h1>
          <h1 className="text-white hidden sm:block">
            <Link href="https://felys.dev" target="_blank">
              {choose(lang, "Docs", "文档")}
            </Link>
          </h1>
        </li>
        <li className="flex items-center space-x-3">
          <button
            className="text-white"
            onClick={() => {
              setLang(choose(lang, "zh", "en"));
            }}
          >
            <span className={`text-${choose(lang, "elypink", "vpwhite")}`}>
              EN
            </span>
            {" | "}
            <span className={`text-${choose(lang, "vpwhite", "elypink")}`}>
              中
            </span>
          </button>
          <button
            onClick={() =>
              executeCode(choose(lang, code.EN, code.ZH), lang, setOutput)
            }
          >
            <ExecIcon />
          </button>
        </li>
      </ul>
      {collapse && (
        <div className="absolute top-11 left-0 z-10 w-screen backdrop-blur-sm p-1 px-6 shadow-xl sm:hidden">
          <div className="flex items-center space-x-3">
            <h1 className="text-white">
              <Link href="https://github.com/felys-lang/felys" target="_blank">
                {choose(lang, "GitHub", "源码")}
              </Link>
            </h1>
            <h1 className="text-white">
              <Link href="https://felys.dev" target="_blank">
                {choose(lang, "Docs", "文档")}
              </Link>
            </h1>
          </div>
        </div>
      )}
    </nav>
  );
};

const MoreIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#ffffff"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h8m-8 6h16"
      />
    </svg>
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
