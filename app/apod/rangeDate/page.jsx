"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TiTick } from "react-icons/ti";
import { CircleLoader } from "react-spinners";
import { RiErrorWarningFill } from "react-icons/ri";
import dynamic from "next/dynamic";
import Link from "next/link";
import MainComponent from "../../components/MainComponent";
import { dataRangeDate } from "./data";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/minimal.css";
import "sweetalert2";
import { swal } from "@/app/helpers/swal";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

function RangeDate() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [dateErrors, setDateErrors] = useState({
    start: { error: false, message: "" },
    end: { error: false, message: "" },
    range: { error: false, message: "" },
  });
  const [dateSuccess, setDateSuccess] = useState({
    start: { success: false },
    end: { success: false },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setData(JSON.parse(sessionStorage.getItem("NASA-apod")) || []);
    }
  }, []);
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  const minDate = new Date("1995-06-16").getTime();
  const maxDate = new Date().getTime();

  const validateDates = (start, end) => {
    let valid = true;

    if (
      start === "" ||
      new Date(start).getTime() < minDate ||
      new Date(start).getTime() > maxDate
    ) {
      setDateErrors((prevErrors) => ({
        ...prevErrors,
        start: {
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
        start: { success: false },
      }));
      valid = false;
      return;
    } else {
      setDateErrors((prevErrors) => ({
        ...prevErrors,
        start: { error: false, message: "" },
      }));
      setDateSuccess((prevSuccess) => ({
        ...prevSuccess,
        start: { success: true },
      }));
    }

    if (
      end === "" ||
      new Date(end).getTime() < minDate ||
      new Date(end).getTime() > maxDate
    ) {
      setDateErrors((prevErrors) => ({
        ...prevErrors,
        end: {
          error: true,
          message: `End date must be between ${new Date(
            minDate
          ).toLocaleDateString()} and ${new Date(
            maxDate
          ).toLocaleDateString()}.`,
        },
      }));
      setDateSuccess((prevSuccess) => ({
        ...prevSuccess,
        end: { success: false },
      }));
      valid = false;
      return;
    } else {
      setDateErrors((prevErrors) => ({
        ...prevErrors,
        end: { error: false, message: "" },
      }));
      setDateSuccess((prevSuccess) => ({
        ...prevSuccess,
        end: { success: true },
      }));
    }

    if (start && end && new Date(start).getTime() > new Date(end).getTime()) {
      setDateErrors((prevErrors) => ({
        ...prevErrors,
        range: {
          error: true,
          message: "End date cannot be before than the start date.",
        },
      }));
      setDateSuccess((prevSuccess) => ({
        ...prevSuccess,
        range: { success: false },
      }));
      setDateSuccess((prevSuccess) => ({
        ...prevSuccess,
        end: { success: false },
      }));
      valid = false;
      return;
    } else {
      setDateErrors((prevErrors) => ({
        ...prevErrors,
        range: { error: false, message: "" },
      }));
    }

    return valid;
  };

  const searchData = (e) => {
    e.preventDefault();

    if (validateDates(startDate, endDate)) {
      getAPI(startDate, endDate);
    }
  };

  const getAPI = async (start, end) => {
    try {
      setIsLoading(true);
      const request = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj&start_date=${start}&end_date=${end}`
      );
      const response = await request.json();
      sessionStorage.setItem("NASA-pictures", JSON.stringify(response));
      setStartDate("");
      setEndDate("");
      setDateErrors({
        start: { error: false, message: "" },
        end: { error: false, message: "" },
        range: { error: false, message: "" },
      });
      setDateSuccess({
        start: { success: false },
        end: { success: false },
      });
      setIsLoading(false);
      setData(response);
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
        swal("Something went wrong! Try again!");
      }, 3000);
      console.error(error);
    }
  };

  return (
    <main className="relative">
      <MainComponent
        title={dataRangeDate.mainComponent?.title}
        text1={dataRangeDate.mainComponent.text1}
        text2={dataRangeDate.mainComponent.text2}
      />
      <form onSubmit={searchData}>
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between sm:gap-2 max-w-2xl m-auto mt-5 px-4">
          <div className="h-24 flex flex-col">
            <div className="flex justify-start items-center">
              <span className="text-md text-black-700 font-light ">
                Start Date
              </span>
            </div>
            <div className="flex-column items-center">
              <div className="flex items-center ">
                <input
                  type="date"
                  className="w-72  sm:h-16 h-10 border cursor-pointer focus:outline-none px-2 rounded text-gray-700 font-light hover:bg-gray-100"
                  value={startDate}
                  onChange={(e) => {
                    validateDates(e.target.value, "");
                    setStartDate(e.target.value);
                  }}
                />
                {dateErrors.start.error && (
                  <RiErrorWarningFill className="text-red-300 text-2xl ml-1 font-light " />
                )}
                {dateSuccess.start.success && (
                  <TiTick className="text-green-700 text-2xl ml-1 font-light" />
                )}
              </div>
            </div>
            {dateErrors.start.error && (
              <div className="text-red-500 text-start text-xs mt-1">
                {dateErrors.start.message}
              </div>
            )}
          </div>

          <div className="h-24 flex flex-col">
            <div className="flex justify-start items-center">
              <span className="text-md text-black-700 font-light ">
                End Date
              </span>
            </div>
            <div className="flex-column  items-center ">
              <div className="flex items-center  ">
                <input
                  type="date"
                  className="w-72 sm:h-16   h-10 border cursor-pointer focus:outline-none px-2 rounded text-gray-700 font-light hover:bg-gray-100"
                  value={endDate}
                  onChange={(e) => {
                    validateDates(startDate, e.target.value);
                    setEndDate(e.target.value);
                  }}
                />
                {dateErrors.end.error ||
                  (dateErrors.range.error && (
                    <RiErrorWarningFill className="text-red-300 text-2xl ml-1 font-light" />
                  ))}
                {dateSuccess.end.success && (
                  <TiTick className="text-green-700 text-2xl ml-1 font-light" />
                )}
              </div>
            </div>
            {dateErrors.end.error && (
              <div className="text-red-500 text-start text-xs mt-1">
                {dateErrors.end.message}
              </div>
            )}
            {dateErrors.range.error && (
              <div className="text-red-500 text-start text-xs mt-1">
                {dateErrors.range.message}
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
        <div className="max-w-xl m-auto mt-5 ">
       
        </div>
      </form>
      <div className="container p-5 m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {!isLoading
          ? data?.map((img, index) => {
              return (
                <div key={index}>
                  <div className="h-60 sm:h-40 lg:h-50 xl:h-52 flex justify-center items-center overflow-hidden flex-fill border rounded p-2  ">
                    {img?.media_type === "video" ? (
                      <ReactPlayer
                        url={img.url}
                        controls={true}
                        width="100%"
                        height="100%"
                      />
                    ) : (
                      <Link href={`rangeDate/${img?.title}`}>
                        <Image
                          src={img.url}
                          alt={img.title}
                          width={600}
                          height={0}
                        />
                      </Link>
                    )}
                  </div>
                  <div className="flex justify-between p-2">
                    <span> {img.date}</span>
                    <span className="">{img.media_type}</span>
                  </div>
                </div>
              );
            })
          : array?.map((img, index) => {
              return (
                <div key={index}>
                  <div className="h-60 sm:h-40 lg:h-50 xl:h-52 flex justify-center overflow-hidden flex-fill bg-gray-100 animate__animated animate__fadeIn animate__infinite 	 animate__slow">
                    <Image
                      src={""}
                      alt={""}
                      width={600}
                      height={0}
                      className="border rounded "
                    />
                  </div>
                  <div className="flex justify-between mt-1 ">
                    <span className="bg-gray-100 w-24 h-4 border rounded animate__animated animate__fadeIn animate__infinite 	 animate__slow"></span>
                    <span className="bg-gray-100 w-16 h-4 border rounded animate__animated animate__fadeIn animate__infinite 	 animate__slow"></span>
                  </div>
                </div>
              );
            })}
      </div>
    </main>
  );
}

export default RangeDate;
