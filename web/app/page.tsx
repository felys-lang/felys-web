"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Result from "@/components/result";
import VSEditor from "@/components/vseditor";
import { EN, ZH } from "@/constant/code";
import { useState } from "react";

export type Output = {
  time: string;
  out: string;
  msg: string;
  ok: boolean;
};

const Home = () => {
  const [lang, setLang] = useState("en");
  const [code, setCode] = useState({ EN, ZH });
  const [output, setOutput] = useState<undefined | Output>(undefined);

  return (
    <>
      <Navbar code={code} setOutput={setOutput} lang={lang} setLang={setLang} />
      <VSEditor lang={lang} code={code} setCode={setCode} />
      <Result output={output} setOutput={setOutput} />
      <Footer lang={lang}/>
    </>
  );
};

export default Home;
