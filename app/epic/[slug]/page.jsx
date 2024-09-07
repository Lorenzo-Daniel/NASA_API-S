"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { CircleLoader } from "react-spinners";
import DataBlock from "./DataBlock";
import { dateFormatForCall } from "@/app/helpers/formatDate";
import InnerImageZoomComponent from "@/app/components/InnerImageZoomComponent";

//-------------------------------------

function DetailsEpic() {
  const { slug } = useParams();
  const getSS = JSON.parse(sessionStorage.getItem("NASA-EPIC")) || [];
  const [currentObject, setCurrentObject] = useState(null);

  useEffect(() => {
    const findObject = () => {
      const title = decodeURIComponent(slug);
      const find = getSS.find((element) => element.identifier === title);
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

  const { image, date, coords } = currentObject;

  const {
    attitude_quaternions,
    centroid_coordinates,
    dscovr_j2000_position,
    lunar_j2000_position,
    sun_j2000_position,
  } = coords;

  const transformObjToArray = (obj) => {
    return Object.entries(obj).map(([key, value]) => ({
      name: key,
      value: value,
    }));
  };

  const dataNameLists = [
    {
      name: "attitude quaternions",
      array: transformObjToArray(attitude_quaternions),
    },
    {
      name: "centroid coordinates",
      array: transformObjToArray(centroid_coordinates),
    },
    {
      name: "dscovr j2000 position",
      array: transformObjToArray(dscovr_j2000_position),
    },
    {
      name: "lunar j2000 position",
      array: transformObjToArray(lunar_j2000_position),
    },
    {
      name: "sun j2000 position",
      array: transformObjToArray(sun_j2000_position),
    },
  ];

  return (
    <main className=" min-h-dvh bg-black pb-20 flex justify-evenly">
      <div className=" items-center">
        <div className="lg:max-w-xl m-auto">
          <InnerImageZoomComponent
            url={`https://epic.gsfc.nasa.gov/archive/natural/${dateFormatForCall(
              date,
              "/"
            )}/png/${image}.png`}
            date={date}
          />
        </div>
        <div className="flex justify-center">
          <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 m-auto mt-20 gap-4 md:gap-8 p-4 text-sm ">
            {dataNameLists.map((data, index) => {
              return (
                <DataBlock key={index} title={data.name} array={data.array} />
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetailsEpic;
