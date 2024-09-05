"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { CircleLoader } from "react-spinners";
import DataBlock from "./DataBlock";
import { dateFormat } from "@/app/helpers/formatDate";
import InnerImageZoomComponent from "@/app/components/InnerImageZoomComponent";
import TypeWriter from "@/app/components/TypeWryter";

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
      console.log(find, "find");
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

  // const formattedDate = dateFormat(date, "/");

  function euclideanDistanceFormula(x, y, z) {
    return Math.sqrt(x * x + y * y + z * z);
  }

  const sunDistance = euclideanDistanceFormula(
    -103213045.333389,
    102078555.537691,
    44250648.363128
  );

  // console.log(roverToEarthDistance);

  const moonDistance = euclideanDistanceFormula(
    -306087.79995,
    222913.027842,
    125048.52258
  );

  const roverToEarth = euclideanDistanceFormula(
    -1107096.27596,
    921266.73853,
    252121.533454
  );

  const roverToSun = Number(
    (sunDistance - roverToEarth).toFixed()
  ).toLocaleString("en-US");

  const roverToMoon = Number(
    (roverToEarth - moonDistance).toFixed()
  ).toLocaleString("en-US");

  const roverDistance = Number(roverToEarth.toFixed()).toLocaleString("en-US");

  console.log(roverToSun, "roverToSunDistance");
  console.log(roverToMoon, "roverToMoonDistance");
  console.log(roverDistance, "roverToEarth");

  return (
    <main className=" min-h-dvh bg-black pb-20 flex justify-evenly">
    <div className="lg:flex items-center">

      <div className="lg:max-w-xl">
        <InnerImageZoomComponent
          url={`https://epic.gsfc.nasa.gov/archive/natural/${dateFormat(
            date,
            "/"
          )}/png/${image}.png`}
          date={date}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 m-auto gap-4 p-4 text-sm ">
        {dataNameLists.map((data, index) => {
          return <DataBlock key={index} title={data.name} array={data.array} />;
        })}
      </div>
    </div>

      {/* <div className="flex flex-col  lg:flex-row  lg:justify-evenly bg-red-200 pb-20">
        <div className="  m-auto max-w-xl">
          <InnerImageZoomComponent
            url={`https://epic.gsfc.nasa.gov/archive/natural/${dateFormat(
              date,
              "/"
            )}/png/${image}.png`}
            date={date}
          />
        </div>
        
          <div className="container bg-green-400   grid grid-cols-1 md:grid-cols-2  gap-4 ">
            {dataNameLists.map((data, index) => {
              return (
                <DataBlock key={index} title={data.name} array={data.array} />
              );
            })}
          </div>
      </div> */}
    </main>
  );
}

export default DetailsEpic;
