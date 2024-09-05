"use client";
import React, { useEffect, useState } from "react";
import { dataPodcast } from "./data";
import Link from "next/link";
import Select from "react-select";
import { useRouter } from "next/navigation"; // Cambié "next/router" a "next/navigation"
import { swalError } from "../helpers/swal";
import TextComponent from "../components/TextComponent";
import AudioComponent from "../components/AudioComponent";
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
        swalError("Something went wrong! reload and verify your conection!")
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
  console.log(data);

  const options = data.map((item) => ({
    value: item.data[0].title, // Puedes ajustar cómo se construye el valor
    label: item.data[0].title.replace(/^HWHAP\s*/, ""),
  }));


  return (
    <div>
      <TextComponent
        title={dataPodcast.mainComponent.title}
        text1={dataPodcast.mainComponent.text1}
      />

      <div>
      <div className="mt-5 w-sm ">
            <Select
              value={selectedOption}
              onChange={handleSelectChange}
              options={options}
              className={`${loading ? "px-2 animate__animated animate__fadeIn animate__infinite animate__slow max-w-sm m-auto border border-gray-300 rounded" : "max-w-sm m-auto px-2"}`}
              isDisabled = {loading}
              placeholder='Select chapter...'
            />
          </div>
      
        <div className="flex justify-center mt-10">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 p-2">
            {!loading
              ? data.map((item, i) => (
            <AudioComponent key={i} data={item} i={i} audioLinks={audioLinks}/>
                ))
              : Array.from({length:20},((_,i)=> i)).map((_,i) => (
                  <div
                    key={i}
                    className="flex flex-col border border-slate-300 p-2 w-44  md:w-64 xl:w-80 animate__animated animate__fadeIn animate__infinite 	 animate__slow"
                  >
                    <span className="mb-1 h-3 bg-gray-300 w-40" />
                    <div className="bg-gray-200   flex  items-center justify-center  h-32 md:h-28">
                      <span className="w-32 sm:w-44 p-5 bg-zinc-300 mx-5" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="mt-1 sm:px-3 w-14 h-3   px-1 sm:py-1 bg-gray-300 " />
                      <span className="mt-1 sm:px-3 w-10 h-3  px-1 sm:py-1 bg-gray-300" />
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
