import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Felys Playground",
  description: "Online Felys code execution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="bg-vpgray" lang="en">
      <body>{children}</body>
    </html>
  );
}
