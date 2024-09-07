"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { CircleLoader } from "react-spinners";
import { swalFullImg } from "@/app/helpers/swal";
import { IoArrowBackOutline } from "react-icons/io5";
import Link from "next/link";
import DescriptionTextComponent from "@/app/components/DescriptionTextComponent";
import InnerImageZoomComponent from "@/app/components/InnerImageZoomComponent";

//-------------------------------------

function Details() {
  const { slug } = useParams();
  const getSS = JSON.parse(sessionStorage.getItem("NASA-pictures")) || [];
  const [currentObject, setCurrentObject] = useState({});
  const [fullImg, setFullImg] = useState(false);
  const [drop, setDrop] = useState(false);
  const [wait, setWait] = useState(false);
  const { url, explanation, title, date } = currentObject;

  useEffect(() => {
    const findObject = () => {
      const title = decodeURIComponent(slug);
      const find = getSS.find((element) => element.title === title);
      setCurrentObject(find);
    };

    findObject();
  }, [slug]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setWait(true);
    }, 1000);

    return () => clearTimeout(timeoutId); 
  }, []);

  if (!currentObject) {
    return (
      <div className="flex justify-center mt-5">
        <CircleLoader color={"#d4d6da"} size={50} />
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h1 className="text-3xl  font-extralight text-center px-3 text-gray-500">
        {title}
      </h1>
      <div className=" md:max-w-2xl m-auto mt-10 px-5">
        <InnerImageZoomComponent
          url={url}
          date={date}
          setFullImg={setFullImg}
        />

        {wait ? (
          <div>
            <Link
              href={"/apod/rangeDate"}
              className="flex justify-center items-center border p-1 border-gray-300 rounded max-w-36 text-gray-500 hover:text-gray-600 hover:border-gray-500"
            >
              <IoArrowBackOutline size={20} />
              <span className="ml-1 text-sm">back to gallery</span>
            </Link>

            <DescriptionTextComponent
              drop={drop}
              setDrop={setDrop}
              text={explanation}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      {fullImg && swalFullImg(url, setFullImg)}
    </div>
  );
}

export default Details;
