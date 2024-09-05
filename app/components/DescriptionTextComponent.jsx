import React, { useEffect, useRef } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { splitByDots } from "../helpers/functions";
//---------------------------------

function DescriptionTextComponent({ drop, setDrop, text }) {
  const ref = useRef();

  const str = splitByDots(text);

  useEffect(() => {
    const outsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setDrop(false);
      }
    };

    document.addEventListener("mousedown", outsideClick);

    return () => {
      document.removeEventListener("mousedown", outsideClick);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="border border-gray-200 rounded mt-5 bg-gray-200 hover:bg-gray-300 mb-20 "
    >
      <div className="flex justify-between items-center relative p-2">
        <span className="text-gray-500">Description</span>
        <div
          className=" cursor-pointer "
          onClick={() => setDrop((prev) => !prev)}
        >
          {drop ? (
            <IoIosArrowDropup size={25} className="text-gray-500" />
          ) : (
            <IoIosArrowDropdown size={25} className="text-gray-500" />
          )}
        </div>
      </div>
      {drop ? (
        <div className=" bg-gray-200  max-w-screen-md text-gray-800 p-2 pb-5">
          {str.map((item, i) => {
            return (
              <p key={i} className="text-start text-gray-600">
                {item}
              </p>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default DescriptionTextComponent;
