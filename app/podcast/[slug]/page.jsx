"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { CircleLoader } from "react-spinners";
import { splitByDots } from "@/app/helpers/functions";
import AudioComponent from "@/app/components/AudioComponent";
import { swalError } from "@/app/helpers/swal";
//---------------------------

function DetailsPodcast() {
  const { slug } = useParams();
  const getSS = JSON.parse(sessionStorage.getItem("NASA-podcast")) || [];
  const [currentObject, setCurrentObject] = useState(null);
  const [audioLink, setAudioLink] = useState({});

  const reRequestlink = async (href) => {
    try {
      const request = await fetch(href);
      const res = await request.json();
      return res[0];
    } catch (error) {
      swalError("Upss!");
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    const findObject = async () => {
      const title = decodeURIComponent(slug);
      const find = getSS.find((element) => element.title .replace(/^HWHAP\s*/, "")
      .replace(/[#\?&]/g, "")
      .trim() === title);
      setCurrentObject(find);
      console.log(find);

      try {
        const audioLink = await reRequestlink(find.href);
        setAudioLink(audioLink);
      } catch (error) {
        setTimeout(() => {
          swalError("something went wrong with audioLink");
        }, 3000);
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
      <div className="flex justify-center py-10 bg-gray-200">
        {audioLink ? (
          <div>
            <AudioComponent data={currentObject} audioLink={audioLink} />
          </div>
        ) : (
          <CircleLoader color={"#d4d6da"} size={30} />
        )}
      </div>
      <div className="p-10 text-start max-w-4xl m-auto">
        {splitByDots(currentObject.description).map((item, i) => {
          return <p key={i}>{item}</p>;
        })}
      </div>
    </div>
  );
}

export default DetailsPodcast;
