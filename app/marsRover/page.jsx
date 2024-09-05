"use client";
import React, { useEffect, useState } from "react";
import TextComponent from "../components/TextComponent";
import { dataMarsRover } from "./data";
import { getAPI } from "./functionsMarsRover";
import "react-responsive-pagination/themes/minimal.css";
import PaginationComponent from "../components/PaginationComponent";
import SingleDateForm from "../components/SingleDateForm";
import Main from "./Main";

//------------------------------------------

function MarsRover() {
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [petitionLength, setPetitionLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState({ error: false, message: "" });

  useEffect(() => {
    if (petitionLength > 0) {
      setTotalPages(Math.floor(petitionLength / 24));
    }
  }, [petitionLength]);

  useEffect(() => {
    const savedPage = parseInt(sessionStorage.getItem("currentPage"), 10) || 1;
    setCurrentPage(savedPage);

    if (typeof window !== "undefined") {
      const storedData = JSON.parse(sessionStorage.getItem("marsRover")) || [];
      setPetitionLength(storedData.length);
      setData(storedData.slice((savedPage - 1) * 24, savedPage * 24));
    }
  }, []);

  const searchData = (e) => {
    e.preventDefault();

    if (selectedDate) {
      getAPI(selectedDate, setData, setIsLoading, setPetitionLength);
    } else {
      setError({ error: true, message: "You must enter a date" });
    }
  };

  return (
    <main className="relative">
      <TextComponent
        title={dataMarsRover.mainComponent?.title}
        text1={dataMarsRover.mainComponent.text1}
      />

      <SingleDateForm
        searchData={searchData}
        error={error}
        setError={setError}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        isLoading={isLoading}
      />

      <div className="max-w-xl m-auto my-10 ">
        {petitionLength > 24 && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            SSName="marsRover"
            setData={setData}
          />
        )}
      </div>
      <Main data={data} isLoading={isLoading} currentPage={currentPage} />
    </main>
  );
}

export default MarsRover;
