"use client";
import React, { useEffect, useState } from "react";
import MainComponent from "../components/MainComponent";
import { dataPodcast } from "./data";
import Link from "next/link";
import Select from "react-select";
import { useRouter } from "next/navigation"; // Cambié "next/router" a "next/navigation"
import Swal from "sweetalert2";
function Podcast() {
  const [data, setData] = useState([]);
  const [audioLinks, setAudioLinks] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter(); // Usar el router del cliente
  console.log(selectedOption);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    router.push(`/podcast/${selectedOption.value}`); // Redirige al slug seleccionado
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedData = JSON.parse(sessionStorage.getItem("NASA-podcast"));
      if (storedData) {
          setData(storedData);
          setLoading(true)
        await fetchAudioLinks(storedData);
      } else {
        getAPI();
      }
    };

    fetchData();
  }, []);

  const fetchAudioLinks = async (data) => {
    const links = {};
    await Promise.all(
      data.map(async (element, index) => {
        setLoading(true);
        if (!audioLinks[index]) {
          const audioLink = await reRequestlink(element.href);
          links[index] = audioLink;
        }
      })
    );
    setAudioLinks((prevLinks) => ({ ...prevLinks, ...links }));
    setLoading(false);
  };

  const getAPI = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://images-api.nasa.gov/search?q=HWHAP`
      );
      const data = await response.json();

      const sortedData = data.collection.items.sort(
        (a, b) =>
          new Date(b.data[0].date_created) - new Date(a.data[0].date_created)
      );
      sessionStorage.setItem("NASA-podcast", JSON.stringify(sortedData));
      setData(sortedData);

      await fetchAudioLinks(sortedData);
    } catch (error) { setTimeout(() => {
        setLoading(false);
        Swal.fire({
          title: "Something went wrong! reload and verify your conection!",
          showConfirmButton: false,
          showCloseButton: true,
       
          customClass: {
            popup: "h-60",
            title: "font-extralight ",
            closeButton: "hover:text-gray-500",
          },
        });
      }, 3000);
      console.error("Ocurrió un error al obtener los datos Nasa Src:", error);
    }
  };

  const reRequestlink = async (href) => {
    try {
      const request = await fetch(href);
      const res = await request.json();
      return res[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const options = data.map((item) => ({
    value: item.data[0].title, // Puedes ajustar cómo se construye el valor
    label: item.data[0].title.replace(/^HWHAP\s*/, ""),
  }));
  const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  return (
    <div>
      <MainComponent
        title={dataPodcast.mainComponent.title}
        text1={dataPodcast.mainComponent.text1}
      />

      <div>
      <div className="mt-5 w-sm ">
            <Select
              value={selectedOption}
              onChange={handleSelectChange} // Usar la función de cambio
              options={options}
              className={`${loading ? "animate__animated animate__fadeIn animate__infinite 	 animate__slow max-w-sm m-auto" : "max-w-sm m-auto"}`}
              isDisabled = {loading}
            />
          </div>
      
        <div className="flex justify-center mt-10">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 p-2">
            {!loading
              ? data.map((element, index) => (
                  <div key={index} className="flex flex-col border p-2">
                    <span className="text-sm md:text-md hidden md:block ml-1 mb-1">
                      {element.data[0].title.replace(/.*Ep\d+\s+/, "")}
                    </span>
                    <span className="text-sm md:text-md lg:hidden md:hidden ml-1">
                      {element.data[0].title.match(/Ep\d+/)}
                    </span>
                    {audioLinks[index] && (
                      <div className="bg-blue-50 rounded lg:h-28 flex flex-col items-center justify-center relative">
                        <audio
                          src={audioLinks[index]}
                          controls
                          className="w-40 sm:w-44 md:w-60 lg:w-64 xl:w-80 p-5 rounded text-red"
                        />
                        <span className="text-sm md:text-md hidden absolute bottom-1 left-2 lg:block">
                          {element.data[0].title.match(/Ep\d+/)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-sm md:text-md ml-1">
                        {element.data[0].date_created.slice(0, 10)}
                      </span>
                      <Link
                        href={`podcast/${element.data[0].title}`}
                        className="mt-1 sm:px-3 px-1 sm:py-1 bg-gray-100 border rounded text-gray-500 hover:opacity-200 hover:text-black hover:bg-gray-200 text-sm"
                      >
                        More
                      </Link>
                    </div>
                  </div>
                ))
              : skeletonArray.map((element, index) => (
                  <div
                    key={index}
                    className="flex flex-col border p-2 w-44  md:w-64 xl:w-80 animate__animated animate__fadeIn animate__infinite 	 animate__slow"
                  >
                    <span className="mb-1 h-3 bg-gray-100 w-12" />
                    <div className="bg-gray-100   flex  items-center justify-center  h-32 md:h-28">
                      <span className="w-32 sm:w-44 p-5 bg-zinc-300 mx-5" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="mt-1 sm:px-3 w-10 h-3  px-1 sm:py-1 bg-gray-100 " />
                      <span className="mt-1 sm:px-3 w-10 h-3  px-1 sm:py-1 bg-gray-100" />
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Podcast;
