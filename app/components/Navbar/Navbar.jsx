import React from "react";
import Image from "next/image";
import logo from '../../../public/images/nasa-logo.png';
import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <nav className="shadow-md p-3">
      <Link href='/'>
        <Image src={logo} alt="NASA logo" width={100} height={50} />
      </Link>
      </nav>
    </header>
  );
};

export default Navbar;

