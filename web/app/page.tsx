"use client";
import { useState } from "react";
import Workbench from "@/components/workbench";
import Navbar from "@/components/navbar";

export default function Home() {
  const [codebase, setCodebase] = useState({
    cursor: 0,
    name: ["foo", "bar", "fuzz"],
    code: ["return foo;", "return bar;", "return fuzz;"],
  });

  return (
    <>
      <Navbar codebase={codebase} setCodebase={setCodebase} />
      <Workbench codebase={codebase} setCodebase={setCodebase} />
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="p-2">
      <p className="text-center text-sm text-neutral-400">
        © All rights reserved by FelysNeko
      </p>
    </footer>
  );
}
