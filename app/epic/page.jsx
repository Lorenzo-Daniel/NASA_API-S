"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TiTick } from "react-icons/ti";
import { CircleLoader } from "react-spinners";
import { RiErrorWarningFill } from "react-icons/ri";
import dynamic from "next/dynamic";
import MainComponent from "../components/MainComponent";
import { dataEpic } from "./data";
import Image from "next/image";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2";

function Epic() {
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [carouselIndicators, setCarouselIndicators] = useState(false);
  const [dateErrors, setDateErrors] = useState({
    selectedDate: { error: false, message: "" },
  });
  const [dateSuccess, setDateSuccess] = useState({
    selectedDate: { success: false },
  });

  const arrayForSkeleton = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  ];

  const minDate = new Date("2015-07-5").getTime();
  const maxDate = new Date().getTime();

  const validateDates = (selectedDate) => {
    let valid = true;

    if (
      selectedDate === "" ||
      new Date(selectedDate).getTime() < minDate ||
      new Date(selectedDate).getTime() > maxDate
    ) {
      setDateErrors((prevErrors) => ({
        ...prevErrors,
        selectedDate: {
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
        selectedDate: { success: false },
      }));
      valid = false;
      return;
    } else {
      setDateErrors((prevErrors) => ({
        ...prevErrors,
        selectedDate: { error: false, message: "" },
      }));
      setDateSuccess((prevSuccess) => ({
        ...prevSuccess,
        selectedDate: { success: true },
      }));
    }
    return valid;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setData(JSON.parse(sessionStorage.getItem("NASA-EPIC")) || []);
    }
  }, []);

  const searchData = (e) => {
    e.preventDefault();

    if (validateDates(selectedDate)) {
      getAPI(selectedDate);
    }
  };

  const getAPI = async (selectedDate) => {
    try {
      setIsLoading(true);
      const request = await fetch(
        `https://api.nasa.gov/EPIC/api/natural/date/${selectedDate}?api_key=DEMO_KEY`
      );
      const response = await request.json();
      sessionStorage.setItem("NASA-EPIC", JSON.stringify(response));
      setSelectedDate("");
      setDateErrors({
        selectedDate: { error: false, message: "" },
      });
      setDateSuccess({
        selectedDate: { success: false },
      });

      setData(response);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
        Swal.fire({
          title: "Something went wrong! Try again!",
          showConfirmButton: false,
          showCloseButton: true,
          customClass: {
            popup: "h-60",
            title: "font-extralight ",
            closeButton: "hover:text-gray-500",
          },
        });
      }, 3000);
      console.error(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCarouselIndicators(window.innerWidth > 768);
    }

    const handleResize = () => {
      setCarouselIndicators(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="">
      <MainComponent
        title={dataEpic.mainComponent?.title}
        text1={dataEpic.mainComponent.text1}
        text2={dataEpic.mainComponent.text2}
      />
      <form onSubmit={searchData}>
        <div className="flex flex-col  items-center mt-5 ">
          <div className="h-24 flex flex-col">
            <div className="flex justify-start items-center">
              <span className="text-md text-black-700 font-light ">
                Enter Date
              </span>
            </div>
            <div className="flex-column items-center">
              <div className="flex items-center ">
                <input
                  type="date"
                  className="w-72  sm:h-16 h-10 border cursor-pointer focus:outline-none px-2 rounded text-gray-700 font-light hover:bg-gray-100"
                  value={selectedDate}
                  onChange={(e) => {
                    validateDates(e.target.value, "");
                    setSelectedDate(e.target.value);
                  }}
                />
                {dateErrors.selectedDate.error && (
                  <RiErrorWarningFill className="text-red-300 text-2xl ml-1 font-light " />
                )}
                {dateSuccess.selectedDate.success && (
                  <TiTick className="text-green-700 text-2xl ml-1 font-light" />
                )}
              </div>
            </div>
            {dateErrors.selectedDate.error && (
              <div className="text-red-500 text-start text-xs mt-1">
                {dateErrors.selectedDate.message}
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
      </form>
      <Carousel
        rightArrow={"next"}
        showArrows={true}
        showIndicators={carouselIndicators}
        className="bg-black m-5 "
        showThumbs={false}
      >
        {!isLoading
          ? data?.map((obj, index) => {
              const fullDate = new Date(data[0].date);
              const year = fullDate.getFullYear().toString();
              const month = ("0" + (fullDate.getMonth() + 1)).slice(-2);
              const date = ("0" + fullDate.getDate()).slice(-2);
              const formatedDate = `${year}/${month}/${date}`;
              return (
                <div
                  key={index}
                  className="flex justify-center items-center relative "
                >
                  <Link href={`epic/${obj?.identifier}`}>
                    <Image
                      src={`https://epic.gsfc.nasa.gov/archive/natural/${formatedDate}/png/${obj.image}.png`}
                      alt={obj.identifier}
                      width={800}
                      height={0}
                    />
                  </Link>
                  <span className="text-white absolute right-0 left-0 bottom-0 md:bottom-8">
                    Date: {obj.date}
                  </span>
                </div>
              );
            })
          : arrayForSkeleton?.map((img, index) => {
              return (
                <div key={index}>
                  <div className="h-96 flex justify-center overflow-hidden flex-fill bg-gray-100 animate__animated animate__fadeOut animate__infinite 	 animate__slower">
                    <Image
                      src={""}
                      alt={""}
                      width={600}
                      height={0}
                      className="border rounded "
                    />
                  </div>
                </div>
              );
            })}
      </Carousel>
    </main>
  );
}

//

export default Epic;
