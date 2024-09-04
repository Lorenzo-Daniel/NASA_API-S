"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import TextComponent from "../../components/TextComponent";
import Main from "./Main";
import "sweetalert2";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { singleDate } from "./data";
import { swal } from "@/app/helpers/swal";
import SingleDateForm from "@/app/components/SingleDateForm";
import { dateFormat } from "@/app/helpers/formatDate";
import { searchData, getAPI } from "./singleDateFunctions";
import Image from "next/image";
import Swal from "sweetalert2";
//---------------------------------------------

function SingleDate() {
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ error: false, messagge: "" });
  const [fullImg, setFullImg] = useState(false);

  const searchData = (e) => {
    e.preventDefault();

    if (selectedDate) {
      setError({ error: true, messagge: "" });
      const formatted = dateFormat(selectedDate, "-");
      getAPI(formatted);
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

  return (
    <section className="mb-20 relative">
      <TextComponent
        title={singleDate.mainComponent?.title}
        text1={singleDate.mainComponent.text1}
      />

      <SingleDateForm
        searchData={searchData}
        error={error}
        setError={setError}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        isLoading={isLoading}
      />

      <Main data={data} isLoading={isLoading} setFullImg={setFullImg} fullImg={fullImg} />

        {/* <div className=" absolute bg-black bg-opacity-75 w-dvw min-h-dvh h-auto  flex justify-center p-10 top-0">
          <Image className="" src={data.url} width={1000} height={800} />
          <button onClick={()=>setFullImage(false)}>close</button>
        </div> 
      )}*/}
    </section>
  );
}

export default SingleDate;
