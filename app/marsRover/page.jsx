"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TiTick } from "react-icons/ti";
import { CircleLoader } from "react-spinners";
import { RiErrorWarningFill } from "react-icons/ri";
import Link from "next/link";
import MainComponent from "../components/TextComponent";
import { dataMarsRover } from "./data";
import { getAPI } from "./functionsMarsRover";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/minimal.css";
import { validateSingleDate } from "../helpers/validationDates";
import PaginationComponent from "../components/PaginationComponent";

function MarsRover() {
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [petitionLength, setPetitionLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [dateErrors, setDateErrors] = useState({
    selectedDate: { error: false, message: "" },
  });
  const [dateSuccess, setDateSuccess] = useState({
    selectedDate: { success: false },
  });

  const arrayForSkeleton = Array.from({ length: 20 }, (_, i) => i);

  useEffect(() => {
    if (petitionLength > 0) {
      setTotalPages(Math.ceil(petitionLength / 25));
    }
  }, [petitionLength]);

  useEffect(() => {
    const savedPage = parseInt(sessionStorage.getItem("currentPage"), 10) || 1;
    setCurrentPage(savedPage);

    if (typeof window !== "undefined") {
      const storedData = JSON.parse(sessionStorage.getItem("marsRover")) || [];
      setPetitionLength(storedData.length);
      setData(storedData.slice((savedPage - 1) * 25, savedPage * 25));
    }
  }, []);

  const searchData = (e) => {
    e.preventDefault();
    if (
      validateSingleDate(
        selectedDate,
        "2013-01-01",
        setDateErrors,
        setDateSuccess
      )
    ) {
      getAPI(selectedDate, setData, setIsLoading, setPetitionLength);
    }
  };

  console.log(data);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    sessionStorage.setItem("currentPage", page);
    const storedData = JSON.parse(sessionStorage.getItem("marsRover")) || [];
    setData(storedData.slice((page - 1) * 25, page * 25));
  };

  return (
    <main className="relative">
      <MainComponent
        title={dataMarsRover.mainComponent?.title}
        text1={dataMarsRover.mainComponent.text1}
      />
      <form onSubmit={searchData}>
        <div className="flex flex-col items-center mt-5">
          <div className="h-24 flex flex-col">
            <div className="flex justify-start items-center">
              <span className="text-md text-black-700 font-light">
                Enter Date
              </span>
            </div>
            <div className="flex-column items-center">
              <div className="flex items-center">
                <input
                  type="date"
                  className="w-72 sm:h-16 h-10 border cursor-pointer focus:outline-none px-2 rounded text-gray-700 font-light hover:bg-gray-100"
                  value={selectedDate}
                  onChange={(e) => {
                    validateSingleDate(
                      e.target.value,
                      "2013-01-01",
                      setDateErrors,
                      setDateSuccess
                    );
                    setSelectedDate(e.target.value);
                  }}
                />
                {dateErrors?.selectedDate.error && (
                  <RiErrorWarningFill className="text-red-300 text-2xl ml-1 font-light" />
                )}
                {dateSuccess?.selectedDate.success && (
                  <TiTick className="text-green-700 text-2xl ml-1 font-light" />
                )}
              </div>
            </div>
            {dateErrors?.selectedDate.error && (
              <div className="text-red-500 text-start text-xs mt-1">
                {dateErrors.selectedDate.message}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <div>
            {!isLoading ? (
              <button
                type="submit"
                className="h-14 w-24 px-3 py-2 bg-gray-100 border rounded text-gray-500 hover:opacity-200 hover:text-black hover:bg-gray-200 sm:mt-5"
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
      <div className="max-w-xl m-auto mt-5 ">
        {petitionLength > 25 && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            SSName="marsRover"
            setData={setData}
          />
        )}
      </div>

      <div
  className="container p-5 m-auto grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-x-4 gap-y-4"
>
  {!isLoading
    ? data?.map((element, index) => (
        <div key={index} className="w-full">
          <div className="shadow-md shadow-slate-500 overflow-hidden rounded-md relative w-full h-full">
            <Link
              href={`marsRover/${element?.id}`}
              onClick={() => {
                sessionStorage.setItem("currentPage", currentPage); // Guardar la página actual
              }}
            >
              <Image
                src={element?.img_src}
                alt={element?.id}
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
              <span className="p-3 absolute left-0 bottom-0 text-white text-sm">
                {element.rover.name}
              </span>
            </Link>
          </div>
        </div>
      ))
    : arrayForSkeleton.map((_, index) => (
        <div key={index} className="w-full">
          <div className="h-40 flex justify-center overflow-hidden flex-fill bg-gray-100 animate__animated animate__fadeIn animate__infinite animate__slow w-full"></div>
          <div className="flex justify-between mt-1"></div>
        </div>
      ))}
</div>
    </main>
  );
}

export default MarsRover;
