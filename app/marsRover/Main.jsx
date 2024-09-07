import React from "react";
import Link from "next/link";
import Image from "next/image";

//-----------------------------------

function Main({ data, isLoading }) {
  return (
    <div className="container p-5 m-auto grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-x-4 gap-y-4">
      {!isLoading
        ? data?.map((element, index) => (
            <div key={index} className="w-full">
              <div className="shadow-md shadow-slate-500 overflow-hidden rounded-md relative w-full h-full">
                <Link href={`marsRover/${element?.id}`}>
                  <Image
                    src={element?.img_src}
                    alt={element?.id}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                  <span className="p-3 absolute left-0 bottom-0 text-white text-sm">
                    {element.rover.name}
                  </span>
                </Link>
              </div>
            </div>
          ))
        : Array.from({ length: 20 }, (_, i) => i).map((_, index) => (
            <div
              key={index}
              className="container shadow-md shadow-slate-500 m-auto min-w-[50px] min-h-[200px]  max-w-[300px] max-h-[300px] rounded-md bg-gray-300 mt-5 motion-safe:animate-pulse "
            >
              <p className="p-3 absolute left-2 bottom-2  bg-gray-200  w-32 "></p>
            </div>
          ))}
    </div>
  );
}

export default Main;
