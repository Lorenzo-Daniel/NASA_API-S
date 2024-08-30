"use client";
import React, { useEffect, useState } from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import Link from "next/link";
import MainComponent from "../components/MainComponent";
import dynamic from "next/dynamic";
import { CircleLoader } from "react-spinners";
import { dataEpic } from "./data";
import { Carousel } from "react-responsive-carousel";
import DatePickerComponent from "../components/DatePickerComponent";
import { formatDateSingleDateComponent } from "../helpers/formatDate";
import Button from "../components/Button";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
function Epic() {
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [carouselIndicators, setCarouselIndicators] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });

  const arrayForSkeleton = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  ];

  function raizCuadradaSumaCuadrados(a, b, c) {
    return Math.sqrt(a * a + b * b + c * c);
  }

  const response = raizCuadradaSumaCuadrados(
    -106651406.22832,
    99004406.571716,
    42917919.110164
  );

  let numero = Number(response.toFixed());
  console.log(numero.toLocaleString("en-US"));

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
      const formated = formatDateSingleDateComponent(selectedDate);
      getAPI(formated);
    } else {
      setError({ error: true, message: "You must enter a date" });
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
      />
      <form onSubmit={searchData}>
        <DatePickerComponent
          error={error}
          setError={setError}
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        />
      

        <div className="flex justify-center ">
          <div>
            {!isLoading ? (
         <Button type={'submit'} action={'Search'}/>
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
                  key={obj.identifier}
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
