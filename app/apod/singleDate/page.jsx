"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import MainComponent from "../../components/MainComponent";
import InnerImageZoom from "react-inner-image-zoom";
import Button from "@/app/components/Button";
import "sweetalert2";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { CircleLoader } from "react-spinners";
import { singleDate } from "./data";
import { swal } from "@/app/helpers/swal";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import { formatDateSingleDateComponent } from "@/app/helpers/formatDate";
import DataPickerComponent from "@/app/components/DatePickerComponent.jsx";

function SingleDate() {
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ error: false, messagge: "" });

  const searchData = (e) => {
    e.preventDefault();

    if (selectedDate) {
      setError({ error: true, messagge: "" });
      const formated = formatDateSingleDateComponent(selectedDate);
      getAPI(formated);
    } else {
      setError({ error: true, message: "You must enter a date" });
    }
  };

  const getAPI = async (selectedDate) => {
    try {
      setIsLoading(true);
      const request = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj&date=${selectedDate}&concept_tags=True`
      );
      const response = await request.json();
      setIsLoading(false);
      setData(response);
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
        swal("Something went wrong! Check your connection and try again!");
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
        <DataPickerComponent
          error={error}
          setError={setError}
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        />

        <div className="flex justify-center ">
          <div>
            {!isLoading ? (
              <Button type={"submit"} action={"Search"} />
            ) : (
              <div className="flex justify-center mt-5">
                <CircleLoader color={"#a2a4a7"} size={50} />
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
                <div>
                  <h1 className="text-3xl  font-extralight text-center px-3">
                    {title}
                  </h1>

                  <div className="flex flex-col lg:flex-col-reverse items-center justify-center  p-5">
                    <div className=" md:max-w-xl">
                      <InnerImageZoom
                        src={url}
                        zoomSrc={url}
                        zoomScale={1}
                        zoomType="click"
                        moveType="drag"
                        hideCloseButton={true}
                      />
                      <span>{date}</span>
                    </div>
                    <p className="text-center 5  max-w-screen-md my-5">
                      {explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center m-10  ">
          <div className="flex flex-col rounded motion-safe:animate-pulse">
            <span className="w-64 h-5 bg-gray-100 my-1 rounded px-1  " />
            <span className="h-96 bg-gray-100 w-80 md:w-96 rounded    " />
            <span className="w-32 h-5 bg-gray-100 my-1 rounded px-1  " />
          </div>
        </div>
      )}
    </main>
  );
}

export default SingleDate;
