import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
const inter = Inter({ subsets: ["latin"] });
import "animate.css";
export const metadata = {
  title: "NASA APIs",
  description: "This is a web app created whit Nasa API information",
  icons: {
    icon: "./icon.png",
  },
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="__next">
          <Navbar />
          <main className="bg-[#f0f2f5] ">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
