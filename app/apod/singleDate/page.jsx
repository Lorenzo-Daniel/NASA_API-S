"use client";
import React, { useState } from "react";
import TextComponent from "../../components/TextComponent";
import Main from "./Main";
import "sweetalert2";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { singleDate } from "./data";
import { swalError } from "@/app/helpers/swal";
import SingleDateForm from "@/app/components/SingleDateForm";
import { dateFormat } from "@/app/helpers/formatDate";

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
        swalError("Something went wrong! Check your connection and try again!");
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

      <Main
        data={data}
        isLoading={isLoading}
        setFullImg={setFullImg}
        fullImg={fullImg}
      />
    </section>
  );
}

export default SingleDate;
