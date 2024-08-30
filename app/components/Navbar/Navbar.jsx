import React from "react";
import Image from "next/image";
import logo from '../../../public/images/nasa-logo.png';
import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <nav className="shadow-sm p-3  bg-gradient-to-r from-gray-200 border-b-2 border-slate-300 ">
      <Link href='/'>
        <Image src={logo} alt="NASA logo" width={100} height={50} />
      </Link>
      </nav>
    </header>
  );
};

export default Navbar;

