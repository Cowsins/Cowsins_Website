import type { AppProps } from "next/app";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <style jsx global>{`
        :root {
          --font-sans: ${fontSans.style.fontFamily};
          --font-mono: ${fontMono.style.fontFamily};
        }
      `}</style>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider defaultTheme="dark" forcedTheme="dark" attribute="class" enableSystem={false}>
          <main className="font-sans">
            <Component {...pageProps} />
          </main>
        </NextThemesProvider>
      </HeroUIProvider>
    </>
  );
}

export const fonts = {
  sans: fontSans.style?.fontFamily || fontSans.className,
  mono: fontMono.style?.fontFamily || fontMono.className,
};
