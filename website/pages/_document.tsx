import { Html, Head, Main, NextScript } from "next/document";
import { fontSans, fontMono } from "@/config/fonts";

export default function Document() {
  return (
    <Html lang="en" className={`dark ${fontSans.variable} ${fontMono.variable}`}>
      <Head />
      <body className="min-h-screen bg-background font-sans antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
