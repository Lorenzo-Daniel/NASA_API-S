import React from "react";
import { FaGithubAlt } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <div className="flex h-12 justify-center items-center mt-15 bg-gradient-to-l from-gray-300  to-gray-100 border-t-2 border-slate-300">
      <div className="flex items-center">
        <div className="">
          <p className="">Developed by Daniel Lorenzo</p>
        </div>
        <div className="flex grow justify-end">
          <FaGithubAlt className="ml-1" />
          <FaLinkedin className="ml-1" />
          <FaEnvelope className="ml-1"/>
        </div>
      </div>
    </div>
  );
}

export default Footer;
