"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { CircleLoader } from "react-spinners";
import { swalFullImg } from "@/app/helpers/swal";
function Details() {
  const { slug } = useParams();
  const getSS = JSON.parse(sessionStorage.getItem("NASA-pictures")) || [];
  const [currentObject, setCurrentObject] = useState(null);
  const [fullImg, setFullImg] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const findObject = () => {
      const title = decodeURIComponent(slug);
      const find = getSS.find((element) => element.title === title);
      setCurrentObject(find);
    };

    findObject();
  }, [slug]);

  if (!currentObject) {
    return (
      <div className="flex justify-center mt-5">
        <CircleLoader color={"#d4d6da"} size={50} />
      </div>
    );
  }
  const { url, explanation, title, date } = currentObject;

  return (
    <div className="mt-8">
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
        <div className="border p-5 border-black ">
          <button
            className="border flex"
            onClick={() => setShow((prev) => !prev)}
          >
            desplegar
          </button>
          <p
            className={`${
              show
                ? " text-center 5  max-w-screen-md my-5 text-gray-800"
                : "hidden"
            }`}
          >
            {explanation}
          </p>
        </div>
      </div>
      {fullImg && swalFullImg(url, setFullImg)}
    </div>
  );
}

export default Details;
