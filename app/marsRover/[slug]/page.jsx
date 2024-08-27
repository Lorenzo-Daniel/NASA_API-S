"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { CircleLoader } from "react-spinners";

function DetailsMarsRover() {
  const { slug } = useParams();
  const getSS = JSON.parse(sessionStorage.getItem("marsRover")) || [];
  const [currentObject, setCurrentObject] = useState(null);

  useEffect(() => {
    const findObject = () => {
      const title = decodeURIComponent(slug);
      const find = getSS.find((element) => element.id == title);
      setCurrentObject(find);
      console.log(find, "find");
    };

    findObject();
  }, [slug]);
  console.log(currentObject);

  if (!currentObject) {
    return (
      <div className="flex justify-center mt-5">
        <CircleLoader color={"#d4d6da"} size={50} />
      </div>
    );
  }

  const { img_src, earth_date, camera, rover } = currentObject;
  const { landing_date, launch_date, name } = rover;
  const { full_name } = camera;

  return (
    <div className="flex flex-col items-center  min-h-screen   bg-black">
      <div className="flex flex-col items-center ">
        <div className="flex justify-center mt-10 overflow-hidden max-w-[700px] max-h-[500px] object-center">
          <InnerImageZoom
            src={img_src}
            zoomSrc={img_src}
            zoomScale={1}
            zoomType="click"
            moveType="drag"
            hideCloseButton={true}
            width={800}
            height={600}
             className="object-cover w-full h-full"
          />
        </div>
        <div className="text-white mt-5 ">
          <p>{name}</p>
          <p>{full_name}</p>
          <p>Date: {earth_date}</p>
          <p>landing date : {landing_date}</p>
          <p>launch date: {launch_date}</p>
          <a href={img_src} className="text-gray-700 ">
            go to original source
          </a>
        </div>
      </div>
    </div>
  );
}

export default DetailsMarsRover;
