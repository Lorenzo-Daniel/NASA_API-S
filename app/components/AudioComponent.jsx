import React from "react";
import Link from "next/link";
function AudioComponent({ data,i ,audioLinks}) {
  console.log(data);
console.log(audioLinks);

  const {date_created,nasa_id,title,href} = data.data[0]
console.log(href);

  return (
    <div className="flex flex-col border border-slate-300 p-2 max-w-80">
      <span className="text-sm md:text-md hidden md:block ml-1 mb-1">
        {title.replace(/.*Ep\d+\s+/, "")}
      </span>
      <span className="text-sm md:text-md lg:hidden md:hidden ml-1">
        {title.match(/Ep\d+/)}
      </span>
      {audioLinks && (
        <div className="bg-gray-300 rounded lg:h-28 flex flex-col items-center justify-center relative">
          <audio
            src={audioLinks[i]}
            controls
            className="w-40 sm:w-44 md:w-60 lg:w-64 xl:w-80 p-5 rounded text-red"
          />
          <span className="text-sm md:text-md hidden absolute bottom-1 left-2 lg:block">
            {title.match(/Ep\d+/)}
          </span>
        </div>
      )}
      <div className="flex justify-between items-center">
        <span className="text-sm md:text-md ml-1">
          {date_created.slice(0, 10)}
        </span>
        <Link
            href={`podcast/${title}`}
          className="mt-1 sm:px-3 px-1 sm:py-1 bg-gray-100 border rounded text-gray-500 hover:opacity-200 hover:text-gray-700 hover:bg-gray-200 text-sm"
        >
          More
        </Link>
      </div>
    </div>
  );
}

export default AudioComponent;
