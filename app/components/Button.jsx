import React from "react";

function Button({type,action,handleOnClick,size}) {
  return (
    <button
      type={type}
      className={` h-12  sm:h-14 w-24 h-${size}  px-3 py-2 mt-3 sm:mt-0 border border-slate-300 rounded bg-gray-50 text-gray-600 hover:text-gray-500 cursor-pointer text-center bg-gradient-to-r from-gray-200 to-gray-100 hover:from-gray-300 hover:to-gray-200`}
      onClick={()=>handleOnClick}
    >
  {action}
    </button>
  );
}

export default Button;
