import React from "react";
import { FaGithubAlt } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <div className="flex bg-gray-100 h-16 justify-center items-end mt-10">
      <div className="flex items-center">
        <div className="">
          <p className="mb-1">Developed by Daniel Lorenzo</p>
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
