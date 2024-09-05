"use client";
import React, { useEffect, useState } from "react";
import TextComponent from "../../components/TextComponent";
import { dataRangeDate } from "./data";
import "react-responsive-pagination/themes/minimal.css";
import "sweetalert2";
import { swalError } from "@/app/helpers/swal";
import RangeDateForm from "@/app/components/RangeDateForm";
import { dateFormat } from "@/app/helpers/formatDate";
import Main from "./Main";

//--------------------------------

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
        swalError("Something went wrong! Try again!");
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

      <Main showRango={showRango} isLoading={isLoading} data={data} />
    </main>
  );
}

export default RangeDate;
