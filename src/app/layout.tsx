import NavBar from "@/components/organisms/NavBar/NavBar";
import "@assets/css/style.min.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Josefin_Sans } from "next/font/google";
import { Providers, theme } from "./provider";
import Head from "next/head";
import { Footer } from "@/components/organisms/Footer/Footer";

const inter = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flix Cinema",
  description:
    "The most current cinema chain that offers ultimate film experience. Modern innovations, eco-friendly, with healthier snack options. Coming soon at PIK Avenue mall, Pantai Indah Kapuk - Jakarta, and soon, Indones",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <body className={inter.className}>
        <Providers>
          <div className="page-wrapper">
            <NavBar />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
