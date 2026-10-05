import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f5f9" },
    { media: "(prefers-color-scheme: dark)", color: "#080b11" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://azzahraattaqina.dev"),
  title: {
    default: "Azzahra Attaqina — Web Developer & Data Analyst Portfolio",
    template: "%s | Azzahra Attaqina",
  },
  description: "Portfolio profesional Azzahra Attaqina, mahasiswa Sarjana Terapan Teknik Informatika Politeknik Negeri Malang yang berfokus pada Web Development responsif dan Data Analytics.",
  keywords: ["Azzahra Attaqina", "Portfolio", "Web Developer", "Data Analyst", "Politeknik Negeri Malang", "React", "Next.js", "Laravel", "Python", "BNSP"],
  authors: [{ name: "Azzahra Attaqina" }],
  openGraph: {
    title: "Azzahra Attaqina — Web Developer & Data Analyst",
    description: "Creative & Professional Portfolio presenting projects, skills, and experience in Web Development and Data Analytics.",
    url: "https://azzahraattaqina.dev",
    siteName: "Azzahra Attaqina Portfolio",
    locale: "id_ID",
    type: "website",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Azza Portfolio",
  },
  formatDetection: {
    telephone: true,
    email: true,
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={`scroll-smooth ${inter.variable} ${outfit.variable}`}>
      <head>
        {/* Set tema sebelum paint agar tidak flicker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('preferred_theme');if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light';}else{document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
      </head>
      <body className="bg-[#080b11] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white min-h-screen flex flex-col">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
