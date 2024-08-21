"use client";
import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { CircleLoader } from "react-spinners";
import { RiErrorWarningFill } from "react-icons/ri";
import dynamic from "next/dynamic";
import MainComponent from "../../components/MainComponent";
import { singleDate } from "./data";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

function SingleDate() {
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState({});
  const [spinner, setSpinner] = useState(!true);
  const [dateErrors, setDateErrors] = useState({
    selectedDate: { error: false, message: "" },
  });
  const [dateSuccess, setDateSuccess] = useState({
    selectedDate: { success: false },
  });

  const minDate = new Date("1995-06-16").getTime();
  const maxDate = new Date().getTime();

  const validateDates = (selectedDate) => {
    let valid = true;

    if (
      selectedDate === "" ||
      new Date(selectedDate).getTime() < minDate ||
      new Date(selectedDate).getTime() > maxDate
    ) {
      setDateErrors((prevErrors) => ({
        ...prevErrors,
        selectedDate: {
          error: true,
          message: `Date must be between ${new Date(
            minDate
          ).toLocaleDateString()} and ${new Date(
            maxDate
          ).toLocaleDateString()}.`,
        },
      }));
      setDateSuccess((prevSuccess) => ({
        ...prevSuccess,
        selectedDate: { success: false },
      }));
      valid = false;
      return;
    } else {
      setDateErrors((prevErrors) => ({
        ...prevErrors,
        selectedDate: { error: false, message: "" },
      }));
      setDateSuccess((prevSuccess) => ({
        ...prevSuccess,
        selectedDate: { success: true },
      }));
    }

    return valid;
  };

  const searchData = (e) => {
    e.preventDefault();

    if (validateDates(selectedDate)) {
      getAPI(selectedDate);
    }
  };

  const getAPI = async (selectedDate) => {
    try {
      setSpinner(true);
      const request = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj&date=${selectedDate}&concept_tags=True`
      );
      const response = await request.json();
      setSelectedDate("");
      setDateErrors({
        selectedDate: { error: false, message: "" },
      });
      setDateSuccess({
        selectedDate: { success: false },
      });
      setSpinner(false);
      setData(response);
    } catch (error) {
      setSpinner(false);
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  const { url, explanation, title, media_type, date } = data;

  return (
    <main className="relative">
      <MainComponent
        title={singleDate.mainComponent?.title}
        text1={singleDate.mainComponent.text1}
        text2={singleDate.mainComponent.text2}
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
                    validateDates(e.target.value, "");
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
            {!spinner ? (
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
      {!spinner && (
        <div>
          <div className="flex flex-col-reverse  items-center justify-center mt-5 p-5">
            <p className="text-center mt-5 md:m-10 max-w-screen-md">
              {explanation}
            </p>
            <div className="flex justify-center   ">
              {media_type === "video" ? (
                <ReactPlayer url={url} controls={true} />
              ) : (
                <div className="flex flex-col md:max-w-xl ">
                  <InnerImageZoom
                    src={url}
                    zoomSrc={url}
                    zoomScale={1}
                    zoomType="click"
                    moveType="drag"
                    hideCloseButton={false}
                  />
                  <div className="flex justify-between">
                    <span className="text-md  text-start ">{title}</span>
                    <span> {date}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default SingleDate;
