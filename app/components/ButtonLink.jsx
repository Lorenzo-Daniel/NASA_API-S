import React from "react";
import Link from "next/link";
function ButtonLink({url, action}) {
  return (
    <Link
      href={url}
      className=" content-center w-60 h-28 border border-slate-400 rounded bg-gray-50 text-gray-500 hover:text-gray-700 cursor-pointer text-center bg-gradient-to-r from-gray-300 to-gray-200 hover:from-gray-400 hover:to-gray-200 "
    >
      <p>{action}</p>
    </Link>
  );
}

export default ButtonLink;
