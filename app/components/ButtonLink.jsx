import React from "react";
import Link from "next/link";
function ButtonLink({url, action}) {
  return (
    <Link
      href={url}
      className=" content-center w-60 h-28 border border-slate-300 rounded bg-gray-50 text-gray-600 hover:text-gray-500 cursor-pointer text-center bg-gradient-to-r from-gray-200 to-gray-100 hover:from-gray-300 hover:to-gray-200 "
    >
      <p>{action}</p>
    </Link>
  );
}

export default ButtonLink;
