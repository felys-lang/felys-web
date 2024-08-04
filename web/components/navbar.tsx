import { Output } from "@/app/page";
import { EN, ZH } from "@/constant/code";
import { choose } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface Props {
  code: string;
  setOutput: Dispatch<SetStateAction<Output | undefined>>;
  lang: string;
  setLang: Dispatch<SetStateAction<string>>;
  setCode: Dispatch<SetStateAction<string>>;
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
    setOutput({ out: "", msg: "Internal Server Error", ok: false });
  }
};

const Navbar = ({ code, setOutput, lang, setLang, setCode }: Props) => {
  return (
    <nav className="p-2 px-6">
      <ul className="flex justify-between">
        <li className="flex items-center space-x-5">
          <h1 className="text-elypink text-lg font-medium">
            <Link href="/">
              {choose(lang, "Felys Playground", "FELYS在线运行")}
            </Link>
          </h1>
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
        </li>
        <li className="flex items-center space-x-3">
          <button
            className="text-elypink"
            onClick={() => {
              setLang(choose(lang, "zh", "en"));
              setCode(choose(lang, ZH, EN));
            }}
          >
            {lang.toUpperCase()}
          </button>
          <button onClick={() => executeCode(code, lang, setOutput)}>
            <Image src="/exec.svg" alt="EXEC" width={28} height={28} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
