"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Result from "@/components/result";
import VSEditor from "@/components/vseditor";
import { useState } from "react";

export type Output = {
  out: string;
  msg: string;
  ok: boolean;
};

const Home = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState<undefined | Output>(undefined);

  return (
    <>
      <Navbar code={code} setOutput={setOutput}/>
      <VSEditor code={code} setCode={setCode} />
      <Result output={output} setOutput={setOutput} />
      <Footer />
    </>
  );
};

export default Home;
