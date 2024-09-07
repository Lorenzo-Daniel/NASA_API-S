import React, { useState } from "react";
import ReactPlayer from "react-player";
import { swalFullImg } from "@/app/helpers/swal";
import InnerImageZoomComponent from "@/app/components/InnerImageZoomComponent";
import DescriptionTextComponent from "@/app/components/DescriptionTextComponent";
//----------------------------------------

function Main({ data, isLoading, setFullImg, fullImg }) {
  const [drop, setDrop] = useState(false);
  const { url, explanation, title, media_type, date } = data;

  return (
    <div>
      {!isLoading ? (
        <div className="flex flex-col items-center justify-center mt-5 p-5 ">
          <div className="flex justify-center  ">
            {media_type === "video" ? (
              <div className="min-w-[320px] sm:w-[500px] sm:h-[300px]">
                <ReactPlayer
                  url={url}
                  controls={true}
                  width={"100%"}
                  height={"100%"}
                />
              </div>
            ) : (
              <div className="">
                <h1 className="text-3xl  font-extralight text-center px-3 text-gray-500">
                  {title}
                </h1>
                <div className="flex flex-col  items-center justify-center p-5 mt-5 relative">
                  <div className=" md:max-w-xl">
                    <InnerImageZoomComponent
                      url={url}
                      date={date}
                      setFullImg={setFullImg}
                    />

                    {explanation && (
                      <DescriptionTextComponent
                        drop={drop}
                        setDrop={setDrop}
                        text={explanation}
                      />
                    )}
                  </div>
                </div>
                {fullImg && swalFullImg(data?.url, setFullImg)}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center m-10  ">
          <div className="flex flex-col rounded motion-safe:animate-pulse">
            <span className="w-64 h-5 bg-gray-300 my-1 rounded px-1  " />
            <span className="h-96 bg-gray-300 w-80 md:w-96 rounded    " />
            <span className="w-32 h-5 bg-gray-300 my-1 rounded px-1  " />
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
