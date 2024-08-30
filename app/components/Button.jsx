import React from "react";

function Button({type,action,handleOnClick}) {
  return (
    <button
      type={type}
      className=" h-14 w-24 px-3 py-2 rounded  border border-slate-400 rounded bg-gray-50 text-gray-500 hover:text-gray-700 cursor-pointer text-center bg-gradient-to-r from-gray-300 to-gray-200 hover:from-gray-400 hover:to-gray-200  sm:mt-5 "
      onClick={()=>handleOnClick}
    >
  {action}
    </button>
  );
}

export default Button;
