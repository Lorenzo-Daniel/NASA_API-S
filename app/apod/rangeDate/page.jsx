"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CircleLoader } from "react-spinners";
import dynamic from "next/dynamic";
import MainComponent from "../../components/MainComponent";
import Button from "@/app/components/Button";
import { dataRangeDate } from "./data";
import "react-responsive-pagination/themes/minimal.css";
import "sweetalert2";
import { swal } from "@/app/helpers/swal";
import DateRangePickerComponent from "@/app/components/DateRangePickerComponent";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import { formatDateRangeComponent } from "@/app/helpers/formatDate";

function RangeDate() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ error: false, messagge: "" });
  const [showRango, setShowRango] = useState({
    start: "",
    end: "",
    isTrue: false,
  });

  const arrayForSkeleton = Array.from({ length: 20 }, (_, i) => i + 1);

  // Agregar un useEffect para actualizar showRango al cargar el componente
  useEffect(() => {
    if (typeof window !== "undefined") {
      setData(JSON.parse(sessionStorage.getItem("NASA-pictures")) || []);
      setShowRango(JSON.parse(sessionStorage.getItem("ApodRange")) || {});
    }

    // Función para actualizar el estado cuando cambie sessionStorage
    const handleStorageChange = () => {
      const apodRange = JSON.parse(sessionStorage.getItem("ApodRange")) || {};
      setShowRango(apodRange);
    };

    // Agregar listener personalizado para cambios en sessionStorage
    window.addEventListener("storage", handleStorageChange);
    // Limpieza al desmontar el componente
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const searchData = (e) => {
    e.preventDefault();
    if (!startDate) {
      setError({ error: true, messagge: "You must enter a date" });
      return;
    } else if (startDate && !endDate) {
      setError({ error: true, messagge: "You must enter the end date" });
      return;
    } else {
      const startMinus = formatDateRangeComponent(startDate);
      const endMinus = formatDateRangeComponent(endDate);

      setError({ error: false, messagge: "" });
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
      // Actualizar el estado de showRango inmediatamente después de guardar en sessionStorage
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
    <main className="relative">
      <MainComponent
        title={dataRangeDate.mainComponent?.title}
        text1={dataRangeDate.mainComponent.text1}
        text2={dataRangeDate.mainComponent.text2}
      />

      <form onSubmit={searchData}>
        <DateRangePickerComponent
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          error={error}
          setError={setError}
        />

        <div className="flex justify-center ">
          <div>
            {!isLoading ? (
              <Button type={"submit"} action={"Search"} />
            ) : (
              <div className="flex justify-center mt-5">
                <CircleLoader color={"#d4d6da"} size={50} />
              </div>
            )}
          </div>
        </div>
      </form>
      {showRango.isTrue && (
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
          : arrayForSkeleton.map((_, index) => (
              <div
                key={index}
                className="w-[300px] h-[300px] rounded-md bg-gray-100 mt-10 animate__animated animate__fadeIn animate__infinite animate__slow"
              >
                <p className="text-white p-3 bg-gray-100 h-5 w-32 "></p>
              </div>
            ))}
      </div>
    </main>
  );
}

export default RangeDate;
