"use client";
import React, { useEffect, useState } from "react";
import { dataPodcast } from "./data";
import Select from "react-select";
import { useRouter } from "next/navigation"; // Cambié "next/router" a "next/navigation"
import { swalError } from "../helpers/swal";
import TextComponent from "../components/TextComponent";
import AudioComponent from "../components/AudioComponent";
import { mock } from "./mock";
import PaginationComponent from "../components/PaginationComponent";
import Main from "./Main";
//-------------------------------------------

function Podcast() {
  const [data, setData] = useState([]);
  const [audioLinks, setAudioLinks] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter(); // Usar el router del cliente
  const [currentPage, setCurrentPage] = useState(1);
  const [petitionLength, setPetitionLength] = useState();

  useEffect(() => {
    const getSS = JSON.parse(sessionStorage.getItem('currentPage'))

    if(getSS){
      setCurrentPage(getSS)
    }

    getAPI(currentPage);  
  }, [currentPage]);

  const getAPI = async (currentPage) => {
    setIsLoading(true);
    try {
      const request = await fetch(
        `https://images-api.nasa.gov/search?q=HWHAP&page_size=25&page=${currentPage}`
      );

      const data = await request.json();

      const getItems = data.collection.items.map((item, i) => ({ ...item }));

      const spreadItems = getItems.map((item, i) => ({
        ...item.data[0],
        href: item.href,
      }));
      const sortedData = spreadItems.sort(
        (a, b) => new Date(b.date_created) - new Date(a.date_created)
      );
      setPetitionLength(data.collection.metadata.total_hits);
      sessionStorage.setItem("NASA-podcast", JSON.stringify(sortedData));
      await fetchAudioLinks(sortedData);
      setData(sortedData);
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
        swalError("Something went wrong! reload and verify your conection!");
      }, 3000);
      console.error("Ocurrió un error al obtener los datos Nasa Src:", error);
    }
  };

  const fetchAudioLinks = async (data) => {
    const links = {};
    await Promise.all(
      data.map(async (element, index) => {
        setIsLoading(true);
        if (!audioLinks[index]) {
          const audioLink = await reRequestlink(element.href);
          links[index] = audioLink;
        }
      })
    );
    setAudioLinks((prevLinks) => ({ ...prevLinks, ...links }));
    setIsLoading(false);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    router.push(
      `/podcast/${selectedOption.value
        .replace(/^HWHAP\s*/, "")
        .replace(/[#\?&]/g, "")
        .trim()}`
    ); 
  };

  const reRequestlink = async (href) => {
    try {
      const request = await fetch(href);
      const res = await request.json();
      return res[0];
    } catch (error) {
      swalError("We cant load de Audios");
      return null;
    }
  };

  const selectOptions = data.map((item) => ({
    value: item.title, // Puedes ajustar cómo se construye el valor
    label: item.title.replace(/^HWHAP\s*/, ""),
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
            options={selectOptions}
            className={`${
              isLoading
                ? "px-2 animate__animated animate__fadeIn animate__infinite animate__slow max-w-sm m-auto border border-gray-300 rounded"
                : "max-w-sm m-auto px-2"
            }`}
            isDisabled={isLoading}
            placeholder="Select chapter..."
          />
        </div>
        {petitionLength > 24 && (
          <PaginationComponent
            petitionLength={petitionLength}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isLoading={isLoading}
          />
        )}

      <Main data={data} isLoading={isLoading} audioLinks={audioLinks}/>
      </div>
    </div>
  );
}

export default Podcast;

