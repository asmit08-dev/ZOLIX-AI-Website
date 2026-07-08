import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GTMLoader from "@/components/GTMLoader";
import {
  SITE_URL,
  SITE_NAME,
  TWITTER_HANDLE,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
} from "@/lib/seo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
    languages: {
      "en-us": "/",
      "en-in": "/",
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  icons: {
    icon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ctext y='30' x='20' text-anchor='middle' font-size='32' font-family='Poppins, sans-serif' font-weight='800' fill='%23dc6a4f'%3EZ%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${poppins.className} min-h-screen bg-white text-zolix-dark selection:bg-zolix-orange selection:text-white`}
      >
        <GTMLoader />
        <Navbar />
        <main>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
