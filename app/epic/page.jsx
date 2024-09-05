"use client";
import React, { useEffect, useState } from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import Link from "next/link";
import TextComponent from "../components/TextComponent";
import { dataEpic } from "./data";
import { Carousel } from "react-responsive-carousel";
import { dateFormat } from "../helpers/formatDate";
import SingleDateForm from "../components/SingleDateForm";
import { swalError } from "../helpers/swal";


//-------------------------------------------

function Epic() {
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [carouselIndicators, setCarouselIndicators] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = JSON.parse(sessionStorage.getItem("NASA-EPIC")) || [];
      setData(storedData);
    }
  }, []);

  const searchData = (e) => {
    e.preventDefault();

    if (selectedDate) {
      setError({ error: true, message: "" });
      const formated = dateFormat(selectedDate, "-");
      getAPI(formated);
    } else {
      setError({ error: true, message: "You must enter a date" });
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

  const getAPI = async (selectedDate) => {
    try {
      setIsLoading(true);
      const request = await fetch(
        `https://api.nasa.gov/EPIC/api/natural/date/${selectedDate}?api_key=DEMO_KEY`
      );
      const response = await request.json();
      console.log(response);
      
      if(response.length){

        sessionStorage.setItem("NASA-EPIC", JSON.stringify(response));
        setIsLoading(false);
        setData(response);
      }else {
        swalError("We dont have pictures for this date! Try another date!");
        setIsLoading(false);

      }
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
        swalError("Something went wrong! Check your connection and try again!");
      }, 3000);
      console.error(error);
    }
  };

  return (
    <main className="mb-20">
      <TextComponent
        title={dataEpic.mainComponent?.title}
        text1={dataEpic.mainComponent.text1}
      />

      <SingleDateForm
        searchData={searchData}
        error={error}
        setError={setError}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        isLoading={isLoading}
      />

      <Carousel
        rightArrow={"next"}
        showArrows={true}
        showIndicators={carouselIndicators}
        className="bg-black m-5 mt-10 min-h-96 "
        showThumbs={false}
      >
        {!isLoading
          ? data?.map((obj, index) => {
              const formattedDate = dateFormat(data[0].date, "/");
              return (
                <div
                  key={obj.identifier}
                  className="flex justify-center items-center relative "
                >
                  <Link href={`epic/${obj?.identifier}`}>
                    <Image
                      src={`https://epic.gsfc.nasa.gov/archive/natural/${formattedDate}/png/${obj.image}.png`}
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
          : Array.from({ length: 22 }, (_, i) => i).map((_, i) => {
              return (
                <div
                  key={i}
                  className="h-96 flex justify-center  flex-fill bg-gray-300 motion-safe:animate-pulse"
                >
                  <span className="mt-3 text-gray-500">loading ...</span>
                </div>
              );
            })}
      </Carousel>
    </main>
  );
}

//

export default Epic;
