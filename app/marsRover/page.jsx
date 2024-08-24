"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TiTick } from "react-icons/ti";
import { CircleLoader } from "react-spinners";
import { RiErrorWarningFill } from "react-icons/ri";
import dynamic from "next/dynamic";
import Link from "next/link";
import MainComponent from "../components/MainComponent";
import { dataMarsRover } from "./data";
import { validateDates,getAPI } from "./functionsMarsRover";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

function MarsRover() {
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateErrors, setDateErrors] = useState({
    selectedDate: { error: false, message: "" },
  });
  const [dateSuccess, setDateSuccess] = useState({
    selectedDate: { success: false },
  });

  const arrayForSkeleton = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,18,19,20
  ];
  
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      setData(JSON.parse(sessionStorage.getItem("marsRover")) || []);
    }
  }, []);
  
  console.log(data);


  const searchData = (e) => {
    e.preventDefault();

    if (validateDates(selectedDate, setDateErrors, setDateSuccess)) {
      getAPI(
        selectedDate,
        setData,
        setIsLoading
      );
    }
  };

  return (
    <main className="relative">
      <MainComponent
        title={dataMarsRover.mainComponent?.title}
        text1={dataMarsRover.mainComponent.text1}
        text2={dataMarsRover.mainComponent.text2}
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
                    validateDates(
                      e.target.value,
                      setDateErrors,
                      setDateSuccess
                    );
                    setSelectedDate(e.target.value);
                  }}
                />
                {dateErrors?.selectedDate.error && (
                  <RiErrorWarningFill className="text-red-300 text-2xl ml-1 font-light " />
                )}
                {dateSuccess?.selectedDate.success && (
                  <TiTick className="text-green-700 text-2xl ml-1 font-light" />
                )}
              </div>
            </div>
            {dateErrors?.selectedDate.error && (
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
      <div className={`${data.length > 50 ? "container p-5 m-auto grid grid-cols-5 md:grid-cols-8  xl:grid-cols-10 lg:grid-cols-10 gap-4 mt-10" : "container p-5 m-auto grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-2 gap-4 mt-10"}`}>
        {!isLoading
          ? data?.map((element, index) => {
              return (
                <div key={index}>
                  <div className={`{${data.length > 50 ? '' :"  lg:h-60 flex justify-center items-center overflow-hidden   "}`}>
                      <Link href={`marsRover/${element?.id}`} >
                        <Image
                          src={element?.img_src}
                          alt={element?.id}
                          width={600}
                          height={600}
                        />
                      </Link>
                      <span className="text-sm">{element.rover.name}</span>
                  </div>
                </div>
              );
            })
          : arrayForSkeleton?.map((img, index) => {
              return (
                <div key={index}>
                  <div className=" lg:h-40 flex justify-center overflow-hidden flex-fill bg-gray-100 animate__animated animate__fadeIn animate__infinite 	 animate__slow"></div>
                  <div className="flex justify-between mt-1 ">
                  </div>
                </div>
              );
            })}
      </div>
    </main>
  );
}

export default MarsRover;
