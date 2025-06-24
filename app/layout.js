import { Lato } from "next/font/google";

import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
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
        className={`${lato.variable} font-sans`}
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
