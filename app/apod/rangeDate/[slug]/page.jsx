"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { CircleLoader } from "react-spinners";

function Details() {
  const { slug } = useParams();
  const getSS = JSON.parse(sessionStorage.getItem("NASA-pictures")) || [];
  const [currentObject, setCurrentObject] = useState(null);


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
  const { url, explanation, title } = currentObject;

  return (
    <div>
      <h1 className="text-3xl  font-extralight text-center pt-10 px-3">
        {title}
      </h1>

      <div className="flex flex-col-reverse  items-center justify-center mt-5 p-5">
        <p className="text-center mt-5 md:m-10 max-w-screen-md">
          {explanation}
        </p>
        <div className=" md:max-w-xl" >
          <InnerImageZoom
            src={url}
            zoomSrc={url}
            zoomScale={1}
            zoomType="click"
            moveType="drag"
            hideCloseButton={false}
          />
        </div>
      </div>
    </div>
  );
}

export default Details;
