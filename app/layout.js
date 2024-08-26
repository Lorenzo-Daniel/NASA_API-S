import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
const inter = Inter({ subsets: ["latin"] });
import 'animate.css'

export const metadata = {
  title: "NASA API's",
  description: "HOME",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
