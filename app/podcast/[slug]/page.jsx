"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { CircleLoader } from "react-spinners";
function DetailsPodcast() {
  const { slug } = useParams();
  const getSS = JSON.parse(sessionStorage.getItem("NASA-podcast")) || [];
  const [currentObject, setCurrentObject] = useState(null);
  const [audioLink, setAudioLink] = useState({});

  const reRequestlink = async (href) => {
    try {
      const request = await fetch(href);
      const res = await request.json();
      return res[0]; // Aquí obtenemos la primera URL del array en el JSON
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  useEffect(() => {
    const findObject = async () => {
      const title = decodeURIComponent(slug);
      const find = getSS.find((element) => element.data[0].title === title);
      setCurrentObject(find);
      try {
        const audioLink = await reRequestlink(find.href);
        setAudioLink(audioLink);
      } catch (error) {
        console.error("something went wrong with audioLink");
      }
    };

    findObject();
  }, [slug]);

  if (!currentObject) {
    return (
      <div className="flex justify-center mt-5">
        <CircleLoader color={"#d4d6da"} size={50} />
      </div>
    );
  }
  return (
    <div>
      <div>
        {audioLink ? (
          <div className="bg-blue-50 h-60  flex flex-col items-center justify-center relative m-auto ">
            <div className="border p-5" >
              <span className="text-md ml-1 ">
                {currentObject.data[0].title.replace(/.*Ep\d+\s+/, "")}
              </span>
              <audio
                src={audioLink}
                controls
                className="  mt-0  rounded text-red"
              />
              <div className="flex justify-between mt-1">
                <span className="text-md ml-1 ">
                  {currentObject.data[0].title.match(/Ep\d+/)}
                </span>
                <span className="text-md ">
                  {currentObject.data[0].date_created.slice(0, 10)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <CircleLoader color={"#d4d6da"} size={30} /> // Mostrar mensaje mientras se carga
        )}
      </div>
      <div className="p-10 text-center max-w-7xl m-auto">
        <p>{currentObject.data[0].description}</p>
      </div>
      algo
    </div>
  );
}

export default DetailsPodcast;
