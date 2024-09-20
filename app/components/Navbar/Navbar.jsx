import React from "react";
import Image from "next/image";
import logo from "../../../public/images/nasa-6.svg";
import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <nav className="shadow-sm p-3  bg-gradient-to-r from-gray-100 to-gray-50 border-b-2 border-slate-200 ">
        <div className="w-20 md:w-24 md:ms-3">
          <Link href="/">
            <Image src={logo} alt="NASA logo" width={'auto'} height={'auto'}  priority={true} />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
