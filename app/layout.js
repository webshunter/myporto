import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gugus Darmayanto",
  description: "Programmer with 6 years of experience, focused on website and mobile application development for the last 2 years. Interested in innovation and development of the latest technology in the IT world and programming.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Gugus Darmayanto</title> 
        <link rel="icon" href="/icon.png" sizes="any" />   
      </head>
      <body
        style={{
          background: "#000000",
          color: "#fff",
        }}
      >
        {children}
        
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-KEDW0DKNYH"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KEDW0DKNYH');
          `
        }}></script>
        
      </body>
    </html>
  );
}
