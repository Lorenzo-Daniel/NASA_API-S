"use client";
import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { CircleLoader } from "react-spinners";
import { RiErrorWarningFill } from "react-icons/ri";
import dynamic from "next/dynamic";
import MainComponent from "../../components/MainComponent";
import { singleDate } from "./data";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import "sweetalert2";
import { validateSingleDate } from "@/app/helpers/validationDates";
import { swal } from "@/app/helpers/swal";

function SingleDate() {
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dateErrors, setDateErrors] = useState({
    selectedDate: { error: false, message: "" },
  });
  const [dateSuccess, setDateSuccess] = useState({
    selectedDate: { success: false },
  });

  const searchData = (e) => {
    e.preventDefault();

    if (
      validateSingleDate(
        selectedDate,
        "1995-06-16",
        setDateErrors,
        setDateSuccess
      )
    ) {
      getAPI(selectedDate);
    }
  };

  const getAPI = async (selectedDate) => {
    try {
      setIsLoading(true);
      const request = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj&date=${selectedDate}&concept_tags=True`
      );
      const response = await request.json();
      setDateSuccess({
        selectedDate: { success: false },
      });
      setIsLoading(false);
      setData(response);
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
        setDateSuccess({
        selectedDate: { success: false },
      });
        swal("Something went wrong! Try again!");
      }, 3000);
      console.error(error);
    }
  };

  const { url, explanation, title, media_type, date } = data;

  return (
    <main className="">
      <MainComponent
        title={singleDate.mainComponent?.title}
        text1={singleDate.mainComponent.text1}
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
                    setSelectedDate(e.target.value);
                    validateSingleDate(
                      e.target.value,
                      "1995-06-16",
                      setDateErrors,
                      setDateSuccess
                    );
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
      {!isLoading ? (
        <div>
          <div className="flex flex-col  items-center justify-center mt-5 p-5">
            <div className="flex justify-center  ">
              {media_type === "video" ? (
                <div className="">
                  <ReactPlayer
                    url={url}
                    controls={true}
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
              ) : (
                <div className="flex flex-col md:max-w-xl ">
                  <div className="flex justify-start mb-1 text-gray-500 ">
                    <h3 className="md:text-2xl ">{title}</h3>
                  </div>
                  <InnerImageZoom
                    src={url}
                    zoomSrc={url}
                    zoomScale={1}
                    zoomType="click"
                    moveType="drag"
                    hideCloseButton={true}
                  />
                  <div className="flex justify-start text-gray-500 ">
                    <span> {date}</span>
                  </div>
                </div>
              )}
            </div>
            <p className="text-center mt-5 md:m-10 max-w-screen-md ">
              {explanation}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-5  ">
          <div className="flex flex-col rounded animate__animated animate__fadeIn animate__infinite 	 animate__slow">
            <span className="w-64 h-5 bg-gray-100 my-1 rounded px-1  "/>
            <span className="h-96 bg-gray-100 w-80 md:w-96 rounded    "/>
            <span className="w-32 h-5 bg-gray-100 my-1 rounded px-1  " />
          </div>
        </div>
      )}
    </main>
  );
}

export default SingleDate;
