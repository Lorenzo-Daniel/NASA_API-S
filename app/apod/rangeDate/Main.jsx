import React from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import Link from "next/link";

function Main({ showRango, isLoading, data }) {
  return (
    <div>
      {showRango.isTrue && (
        <p className="text-center mt-10 text:xs md:text-md lg:text-lg text-gray-500 px-10 underline decoration-solid ">
          RANGE FROM {showRango.start} TO {showRango.end}
          <span className="text-sm"> ({data.length} images)</span>
          <span className="line"></span>
        </p>
      )}
      <div className="flex flex-wrap justify-center gap-10 pb-10 mt-10">
        {!isLoading
          ? data?.map((item, index) => (
              <div
                key={index}
                className="max-w-[300px] max-h-[300px] shadow-md shadow-slate-500 overflow-hidden rounded-md relative"
              >
                {item.media_type === "video" ? (
                  <ReactPlayer
                    url={item.url}
                    controls={true}
                    width={300}
                    height={300}
                  />
                ) : (
                  <Link href={`rangeDate/${item?.title}`}>
                    <Image
                      src={item.url}
                      alt={item.title}
                      width={300}
                      height={300}
                      className="object-cover h-full"
                    />
                    <p className="p-3 absolute left-0 bottom-0 text-white text-sm ">
                      {item.title}
                    </p>
                  </Link>
                )}
              </div>
            ))
          : Array.from({ length: 20 }, (_, i) => i).map((_, index) => (
              <div
                key={index}
                className="w-[300px] h-[300px] rounded-md bg-gray-300 mt-5 motion-safe:animate-pulse"
              >
                <p className="p-3 absolute left-2 bottom-2  bg-gray-200  w-32 "></p>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Main;
