import NavBar from "@/components/organisms/NavBar/NavBar";
import "@assets/css/style.min.css";
import "./globals.css";
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import { Providers, theme } from "./provider";

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
      <body className={inter.className}>
        <Providers>
          <div className="page-wrapper">
            <NavBar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
