"use client";
import React, { useState } from "react";
import TextComponent from "../../components/TextComponent";
import Main from "./Main";
import "sweetalert2";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { singleDate } from "./data";
import SingleDateForm from "@/app/components/SingleDateForm";
import { dateFormatForCall } from "@/app/helpers/formatDate";
import { getAPI } from "./singleDateFunctions";
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
      const formatted = dateFormatForCall(selectedDate, "-");
      getAPI(formatted,setIsLoading,setData);
    } else {
      setError({ error: true, message: "You must enter a date" });
    }
  };

  console.log(selectedDate);



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
