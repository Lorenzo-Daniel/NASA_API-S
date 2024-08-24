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
  const { landing_date, launch_date,name } = rover;
  const { full_name } = camera;


  return (
    <div className="flex flex-col items-center h-dvh  bg-black">
      <div className="md:max-w-xl mt-10">
        <InnerImageZoom
          src={img_src}
          zoomSrc={img_src}
          zoomScale={1}
          zoomType="click"
          moveType="drag"
          hideCloseButton={true}
        />
        <div className="">
          <p className="text-white text-center flex  justify-start px-2 items-center ">
             {name}
          </p>
          <p className="text-white text-center flex  justify-start px-2 items-center">
           {full_name}
          </p>
          <p className="text-white text-center flex  justify-start px-2 items-center">
            Date: {earth_date}
          </p>    <p className="text-white text-center flex  justify-start px-2 items-center">
          landing date :    {landing_date}
          </p>    <p className="text-white text-center flex justify-start px-2 items-center">
          launch date:  {launch_date}
          </p> 
          {dataNameLists.map((data, index) => {
            return (
              <DataBlock key={index} title={data.name} array={data.array} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DetailsMarsRover;
