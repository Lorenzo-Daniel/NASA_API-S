"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CircleLoader } from "react-spinners";
import dynamic from "next/dynamic";
import TextComponent from "../../components/TextComponent";
import { dataRangeDate } from "./data";
import "react-responsive-pagination/themes/minimal.css";
import "sweetalert2";
import { swal } from "@/app/helpers/swal";
import RangeDateForm from "@/app/components/RangeDateForm";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import { dateFormat } from "@/app/helpers/formatDate";
import RangeDatePickerComponent from "@/app/components/RangeDatePickerComponent";
import Button from "@/app/components/Button";
import Main from "./Main";
function RangeDate() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });
  const [showRango, setShowRango] = useState({
    start: "",
    end: "",
    isTrue: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setData(JSON.parse(sessionStorage.getItem("NASA-pictures")) || []);
      setShowRango(JSON.parse(sessionStorage.getItem("ApodRange")) || {});
    }

    const handleStorageChange = () => {
      const apodRange = JSON.parse(sessionStorage.getItem("ApodRange")) || {};
      setShowRango(apodRange);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const searchData = (e) => {
    e.preventDefault();
    if (!startDate) {
      setError({ error: true, message: "You must enter a date" });
      return;
    } else if (startDate && !endDate) {
      setError({ error: true, message: "You must enter the end date" });
      return;
    } else {
      const startMinus = dateFormat(startDate, "-");
      const endMinus = dateFormat(endDate, "-");
      setError({ error: false, message: "" });
      getAPI(startMinus, endMinus);
    }
  };

  const getAPI = async (start, end) => {
    try {
      setIsLoading(true);
      setShowRango({ isTrue: false });
      const request = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj&start_date=${start}&end_date=${end}`
      );
      const response = await request.json();
      sessionStorage.setItem("NASA-pictures", JSON.stringify(response));
      sessionStorage.setItem(
        "ApodRange",
        JSON.stringify({
          start: start.replace(/-/g, "/"),
          end: end.replace(/-/g, "/"),
          isTrue: true,
        })
      );
      setShowRango({
        start: start.replace(/-/g, "/"),
        end: end.replace(/-/g, "/"),
        isTrue: true,
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
    <main className=" mb-20">
      <TextComponent
        title={dataRangeDate.mainComponent?.title}
        text1={dataRangeDate.mainComponent.text1}
        text2={dataRangeDate.mainComponent.text2}
      />
      
      <RangeDateForm
        searchData={searchData}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        error={error}
        setError={setError}
        isLoading={isLoading}
      />
     

<Main showRango={showRango} isLoading={isLoading} data={data}/>



      {/* {showRango.isTrue && (
        <p className="text-center mt-10 text:xs md:text-md lg:text-lg text-gray-500 px-10 underline decoration-solid ">
          RANGE FROM {showRango.start} TO {showRango.end}
          <span className="text-sm"> ({data.length} images)</span>
          <span className="line"></span>
        </p>
      )}
      <div className="flex flex-wrap justify-center gap-10 pb-10 mt-10">
        {!isLoading
          ? data?.map((item, index) => (
              <div
                key={index}
                className="max-w-[300px] max-h-[300px] shadow-md shadow-slate-500 overflow-hidden rounded-md relative"
              >
                {item.media_type === "video" ? (
                  <ReactPlayer
                    url={item.url}
                    controls={true}
                    width={300}
                    height={300}
                  />
                ) : (
                  <Link href={`rangeDate/${item?.title}`}>
                    <Image
                      src={item.url}
                      alt={item.title}
                      width={300}
                      height={300}
                      className="object-cover h-full"
                    />
                    <p className="p-3 absolute left-0 bottom-0 text-white text-sm ">
                      {item.title}
                    </p>
                  </Link>
                )}
              </div>
            ))
          : Array.from({ length: 20 }, (_, i) => i).map((_, index) => (
              <div
                key={index}
                className="w-[300px] h-[300px] rounded-md bg-gray-300 mt-5 motion-safe:animate-pulse"
              >
                <p className="p-3 absolute left-2 bottom-2  bg-gray-200  w-32 "></p>
              </div>
            ))}
      </div> */}
    </main>
  );
}

export default RangeDate;
