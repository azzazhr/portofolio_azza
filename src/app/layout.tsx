import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F6F1" },
    { media: "(prefers-color-scheme: dark)", color: "#1D1C1A" },
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
    icon: "/images/logo(1).jpg",
    apple: "/images/logo(1).jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* Set tema sebelum paint agar tidak flicker — default: LIGHT MODE */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('preferred_theme');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}else{document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light';}var l=localStorage.getItem('preferred_language');if(l==='id'){document.documentElement.lang='id';}else{document.documentElement.lang='en';}}catch(e){document.documentElement.classList.remove('dark');document.documentElement.lang='en';}})();`,
          }}
        />
      </head>
      <body className="bg-[#F8F6F1] text-[#242321] dark:bg-[#1D1C1A] dark:text-[#F5F1E9] antialiased selection:bg-[#B59662] selection:text-white min-h-screen flex flex-col">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
