import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Navbar from "@/components/goodora/navbar";
import Footer from "@/components/goodora/footer";
import "./globals.css";

const DMSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Goodora Social Development & Volunteer Platform",
    template: "%s | Goodora",
  },
  description:
    "Goodora connects volunteers with meaningful community development initiatives. Discover programs, register as a volunteer, and make an impact.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${DMSans.variable} ${DMSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
