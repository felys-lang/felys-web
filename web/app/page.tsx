"use client";
import { useState } from "react";
import Workbench from "@/components/workbench";
import Navbar from "@/components/navbar";

export default function Home() {
  const [codebase, modifier] = useState({
    cursor: 0,
    name: ["foo", "bar"],
    code: ["return foo;", "return bar;"],
  });

  return (
    <>
      <Navbar />
      <Workbench codebase={codebase} modifier={modifier} />
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
