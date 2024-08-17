"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
function Apod() {
  const [today, setToday] = useState(null);
  const categories = [{ category: "Single Date" ,url:'apod/singleDate'}, { category: "Range Date",url:'apod/rangeDate' }];

  //GET TODAY
  const getTodayRequest = async () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    const formatDate = `${year}-${month}-${date}`;
    try {
      // setIsLoading({ today: true });
      const request = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj&date=${formatDate}&concept_tags=True`
      );
      const response = await request.json();
      setToday(response);
      // localStorage.setItem("pictures", JSON.stringify([response]));
      // setIsLoading({ today: false });
      // navigate("/apodGallery");
    } catch (error) {
      // setIsLoading({ today: false });
      alert("Algo salio mal! Vuelve a intentarlo mas tarde");
      console.log(error);
    }
  };

  useEffect(() => {
    // getTodayRequest();
  }, []);
  return (
    <main>
      <h1 className="text-4xl md:text-5xl font-extralight text-center pt-10">
        APOD
      </h1>
      <p className="text-gray-700 font-light text-md sm:text-xl  p-10 pb-5 text-center ">
        With this API you can choose the Astronomy Picture Of the Day or select
        a range of dates and display a gallery
      </p>
      <p className="text-gray-500 text-md sm:text-xl font-light pb-5 p-10 pt-0 text-center ">
        Choose the information about what you want to consult!
      </p>
      <div className=" flex justify-center gap-4 p-4 ">
        {categories.map((item, index) => {
          return (
            <Link
              href={item.url}
              key={index}
              style={{ width: "500px" }}
              className="border hover:bg-gray-100   h-32 lg:h-60 flex-column content-center rounded  cursor-pointer"
            >
              <p className="text-xl text-black text-center ">
                {item.category}
              </p>
            </Link>
          );
        })}
      </div>
      {/* <div>
        <h2>Picture of the Day</h2>
        <span>{today?.date}</span>
        <p>{today?.explanation}</p>
        <div className="w-8/12 h-3/6 overflow-hidden">
          <img
            src={today?.url}
            alt="picture"
            className=""
          />
        </div>
      </div> */}
    </main>
  );
}

export default Apod;
