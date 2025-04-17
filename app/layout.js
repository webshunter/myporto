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
  icon: "/new-icon-path.jpg", // Updated icon path
  meta: {
    icon: "/new-icon-path.jpg", // Updated meta icon path
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/gugus.jpg" sizes="256x256" type="image/x-icon"/>
      <body
        style={{
          background: "#000000",
          color: "#fff",
        }}
      >
        {children}
      </body>
    </html>
  );
}
