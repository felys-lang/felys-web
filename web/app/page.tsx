"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Result from "@/components/result";
import VSEditor from "@/components/vseditor";
import { EN } from "@/constant/code";
import { useState } from "react";

export type Output = {
  out: string;
  msg: string;
  ok: boolean;
};

const Home = () => {
  const [lang, setLang] = useState("en");
  const [code, setCode] = useState(EN);
  const [output, setOutput] = useState<undefined | Output>(undefined);

  return (
    <>
      <Navbar
        code={code}
        setOutput={setOutput}
        lang={lang}
        setLang={setLang}
        setCode={setCode}
      />
      <VSEditor lang={lang} setCode={setCode} />
      <Result lang={lang} output={output} setOutput={setOutput} />
      <Footer />
    </>
  );
};

export default Home;
