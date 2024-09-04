import React, { useState } from "react";
import ReactPlayer from "react-player";
import InnerImageZoom from "react-inner-image-zoom";
import Image from "next/image";
import Button from "@/app/components/Button";
import Swal from "sweetalert2";
import { swalFullImg } from "@/app/helpers/swal";



//----------------------------------------


function Main({ data, isLoading, setFullImg, fullImg }) {
  const { url, explanation, title, media_type, date } = data;
  console.log(url);

  const showModal = () => {};

  return (
    <div>
      {!isLoading ? (
        <div className="flex flex-col items-center justify-center mt-5 p-5 ">
          <div className="flex justify-center  ">
            {media_type === "video" ? (
              <div className="">
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
                    <InnerImageZoom
                      src={url}
                      zoomSrc={url}
                      zoomScale={1}
                      zoomType="click"
                      moveType="drag"
                      hideCloseButton={true}
                    />
                    <div className="flex justify-between">
                      <span>{date}</span>
                      <span
                        className="cursor-pointer"
                        onClick={() => setFullImg((prev) => !prev)}
                      >
                        full Img
                      </span>
                    </div>
                  </div>
                  <p className="text-center 5  max-w-screen-md my-5 text-gray-800">
                    {explanation}
                  </p>
                </div>
                {fullImg && swalFullImg(data.url, setFullImg)}
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
