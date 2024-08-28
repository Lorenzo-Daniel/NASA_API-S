"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import MainComponent from "../components/MainComponent";
import { data } from "../data";

function Home() {
  // Estado para almacenar el índice del elemento actualmente hovered
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const categories = [
    {
      bgImg: "https://apod.nasa.gov/apod/image/2408/SupermoonPoseidon_Maragos_960.jpg",
      name: "apod",
      category: "apod",
      subText: "Astronomy Picture Of the Day",
    },
    {
      bgImg: "https://epic.gsfc.nasa.gov/archive/natural/2024/08/27/jpg/epic_1b_20240827070918.jpg",
      name: "epic",
      category: "epic",
      subText: "Earth Polychromatic Imaging Camera",
    },
    {
      bgImg: "https://sm.mashable.com/t/mashable_in/photo/default/shutterstock-1257451702_1gq1.1248.jpg",
      name: "mars rover",
      category: "marsRover",
      subText: "Mars Rover Photos",
    },
    {
      bgImg: "https://spacecenter.org/wp-content/uploads/2023/07/web-hwhap300.jpg",
      name: "podcast",
      category: "podcast",
      subText: "Houston we had a Podcast!",
    },
  ];

  useEffect(() => {
    sessionStorage.clear();
  }, []);

 
  const handleOnMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  // Función para manejar cuando el ratón sale de un elemento
  const handleOnMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="container m-auto max-w-4xl">
      <MainComponent
        title={data.mainComponent?.title}
        text1={data.mainComponent.text1}
        text2={data.mainComponent.text2}
      />
      <div className="grid p-4 grid-cols-2 gap-4 mt-7">
        {categories.map((item, index) => (
          
          <Link
            href={`/${item.category}`}
            key={index}
            className="border h-32 md:h-60  content-center rounded cursor-pointer  bg-cover  bg-center bg-no-repeat text-center text-white relative hover:transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:bg-indigo-500 duration-300 "
            style={{
              backgroundImage:
                 `url(${item.bgImg})` ,
            }}
         
          >
          <div className="">

            <p className="text-sm md:text-xl absolute top-1 left-1 bg-gradient-to-r from-slate-700 to-slate-900 py-1 px-2 rounded">
              {item.name.toLocaleUpperCase()}
            </p>
            {/* <span className="bg-gradient-to-r from-slate-700 to-slate-900 px-2 py-1 rounded  m-auto text-sm">{item.subText}</span> */}
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
