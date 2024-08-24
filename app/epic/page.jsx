"use client";
import React, { useEffect, useState } from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image  from "next/image";
import Link from "next/link";
import MainComponent from "../components/MainComponent";
import dynamic from "next/dynamic";
import { TiTick } from "react-icons/ti";
import { CircleLoader } from "react-spinners";
import { RiErrorWarningFill } from "react-icons/ri";
import { dataEpic } from "./data";
import { Carousel } from "react-responsive-carousel";
import { getAPI,validateDates } from "./[slug]/functionsEpic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
function Epic() {
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [carouselIndicators, setCarouselIndicators] = useState(false);
  const [dateErrors, setDateErrors] = useState({
    selectedDate: { error: false, message: "" },
  });
  const [dateSuccess, setDateSuccess] = useState({
    selectedDate: { success: false },
  });

  const arrayForSkeleton = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  ];

 
  useEffect(() => {
    if (typeof window !== "undefined") {
      setData(JSON.parse(sessionStorage.getItem("NASA-EPIC")) || []);
    }
  }, []);

  const searchData = (e) => {
    e.preventDefault();

    if (validateDates(selectedDate,setDateErrors,setDateSuccess)) {
      getAPI(selectedDate,setSelectedDate,setDateErrors,setDateSuccess,setData,setIsLoading);
    }
  };



  useEffect(() => {
    if (typeof window !== "undefined") {
      setCarouselIndicators(window.innerWidth > 768);
    }

    const handleResize = () => {
      setCarouselIndicators(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="">
      <MainComponent
        title={dataEpic.mainComponent?.title}
        text1={dataEpic.mainComponent.text1}
        text2={dataEpic.mainComponent.text2}
      />
      <form onSubmit={searchData}>
        <div className="flex flex-col  items-center mt-5 ">
          <div className="h-24 flex flex-col">
            <div className="flex justify-start items-center">
              <span className="text-md text-black-700 font-light ">
                Enter Date
              </span>
            </div>
            <div className="flex-column items-center">
              <div className="flex items-center ">
                <input
                  type="date"
                  className="w-72  sm:h-16 h-10 border cursor-pointer focus:outline-none px-2 rounded text-gray-700 font-light hover:bg-gray-100"
                  value={selectedDate}
                  onChange={(e) => {
                    validateDates(e.target.value,setDateErrors,setDateSuccess);
                    setSelectedDate(e.target.value);
                  }}
                />
                {dateErrors.selectedDate.error && (
                  <RiErrorWarningFill className="text-red-300 text-2xl ml-1 font-light " />
                )}
                {dateSuccess.selectedDate.success && (
                  <TiTick className="text-green-700 text-2xl ml-1 font-light" />
                )}
              </div>
            </div>
            {dateErrors.selectedDate.error && (
              <div className="text-red-500 text-start text-xs mt-1">
                {dateErrors.selectedDate.message}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center ">
          <div>
            {!isLoading ? (
              <button
                type="submit"
                className=" h-14 w-24 px-3 py-2 bg-gray-100 border rounded text-gray-500 hover:opacity-200  hover:text-black hover:bg-gray-200 sm:mt-5 "
              >
                Search
              </button>
            ) : (
              <div className="flex justify-center mt-5">
                <CircleLoader color={"#d4d6da"} size={50} />
              </div>
            )}
          </div>
        </div>
      </form>
      <Carousel
        rightArrow={"next"}
        showArrows={true}
        showIndicators={carouselIndicators}
        className="bg-black m-5 "
        showThumbs={false}
      >
        {!isLoading
          ? data?.map((obj, index) => {
              const fullDate = new Date(data[0].date);
              const year = fullDate.getFullYear().toString();
              const month = ("0" + (fullDate.getMonth() + 1)).slice(-2);
              const date = ("0" + fullDate.getDate()).slice(-2);
              const formatedDate = `${year}/${month}/${date}`;
              return (
                <div
                  key={index}
                  className="flex justify-center items-center relative "
                >
                  <Link href={`epic/${obj?.identifier}`}>
                    <Image
                      src={`https://epic.gsfc.nasa.gov/archive/natural/${formatedDate}/png/${obj.image}.png`}
                      alt={obj.identifier}
                      width={800}
                      height={0}
                    />
                  </Link>
                  <span className="text-white absolute right-0 left-0 bottom-0 md:bottom-8">
                    Date: {obj.date}
                  </span>
                </div>
              );
            })
          : arrayForSkeleton?.map((img, index) => {
              return (
                <div key={index}>
                  <div className="h-96 flex justify-center overflow-hidden flex-fill bg-gray-100 animate__animated animate__fadeOut animate__infinite 	 animate__slower">
                    <Image
                      src={""}
                      alt={""}
                      width={600}
                      height={0}
                      className="border rounded "
                    />
                  </div>
                </div>
              );
            })}
      </Carousel>
    </main>
  );
}

//

export default Epic;
