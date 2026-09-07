import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Insurance Claims Register",
  description: "Register claims and track payments made against them",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${plexSans.variable} ${plexMono.variable} bg-[#F7F8FA] font-sans text-[#1B2430] antialiased`}
      >
        <header className="border-b border-[#E2E5EA] bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-[15px] font-semibold text-[#1B2430]">
              Insurance Claims Register
            </Link>
            <nav className="flex gap-5 text-[14px] text-[#5B6472]">
              <Link href="/" className="hover:text-[#1B2430]">
                Claims
              </Link>
              <Link href="/policies" className="hover:text-[#1B2430]">
                Policies
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
