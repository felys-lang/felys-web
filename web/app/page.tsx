"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Result from "@/components/result";
import VSEditor from "@/components/vseditor";
import { useState } from "react";

export const example = `print("Language for", __elysia__);

heaviside = |x| {
    if x < 0 {
        return 0;
    } elif x == 0 {
        return 0.5;
    } else {
        return 1;
    }
};

result = heaviside(0);
print(result);
`;

export type Output = {
  out: string;
  msg: string;
  ok: boolean;
};

const Home = () => {
  const [code, setCode] = useState(example);
  const [output, setOutput] = useState<undefined | Output>(undefined);

  return (
    <>
      <Navbar code={code} setOutput={setOutput} />
      <VSEditor setCode={setCode} />
      <Result output={output} setOutput={setOutput} />
      <Footer />
    </>
  );
};

export default Home;
