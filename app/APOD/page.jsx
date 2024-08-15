"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

 
function Apod() {
  const [dropDownExplanationIndex, setDropDownExplanationIndex] = useState();
  const [dropDownHandler, setDropDownHandler] = useState(true);
  const [wiki, setWiki] = useState([]);
  const [data, setData] = useState([]);
  // const [spinner, setSpinner] = useState(true);
  const [showResults, setShowResults] = useState(false);
  

  // const popUpImgGaleria = (urlImg, nombre) => {
  //   Swal.fire({
  //     title: `${nombre}`,
  //     color: "#ffffff",
  //     imageUrl: urlImg,
  //     showConfirmButton: false,
  //     showCloseButton: true,
  //     position: "center",
  //     background: "#ffffff",
  //     width: '100%',
  //     showClass: {
  //       popup: "animate__animated animate__fadeIn animate__fast",
  //     },
  //     hideClass: {
  //       popup: "animate__animated animate__fadeOut animate__fast",
  //     },
  //     customClass: {
  //       popup: "galeria-swal2-popup",
  //       closeButton: "swal2-close ",
  //       title: "galeria-swal2-title",
  //       // image: "galeria-swal2-image",
  //     },
  //   });
  // };

  //WIKIPEDIA

  const requestWikipedia = async (keySearch) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&origin=*&utf8=&srsearch=${keySearch}`;
    const option = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const petition = await fetch(url, option);
      const res = await petition.json();
      const resSearch = res?.query?.search;
      const resultArrayMax3 = [];
      for (let i = 0; i < 3; i++) {
        resultArrayMax3.push(resSearch[i]);
      }

      for (let i = 0; i < resultArrayMax3.length; i++) {
        let removeSymbol = resultArrayMax3[i].snippet;
        const removeContent = removeSymbol.replace(/<[^>]*>/g, "");
        resultArrayMax3[i].snippet = removeContent;
      }
      return resultArrayMax3;
    } catch (error) {
      console.log("problems request wiwkipedia max3 undefined");
    }
  };

  const dropDownExplanationHandler = (index) => {
    setDropDownExplanationIndex(index);
    setDropDownHandler((prev) => !prev);
  };

  useEffect(() => {
    const getLS = JSON.parse(localStorage.getItem("pictures")) || [];
    //OBTENER TITLES APOD
    const getTitlesApod = async (getLS) => {
      const titles = getLS.map((element) => element.title);
      const promises = titles.map((title) => requestWikipedia(title));

      try {
        const responses = await Promise.all(promises);
        for (let i = 0; i < responses.length; i++) {
          if (responses[i] === undefined) {
            const defaultResults = await requestWikipedia("Astronomy");
            setWiki((prev) => [...prev, defaultResults]);
          } else {
            setWiki((prev) => [...prev, responses[i]]);
          }
        }
        setData(getLS);
        // setSpinner(false);
        setShowResults(false);
      } catch (error) {
        console.error(error);
      }
    };
    getTitlesApod(getLS);
  }, []);


  const getDate = (e)=> {
const {value} = e.target
console.log(value)

  }
  return (
    <div>
    
    </div>
  );
}

export default Apod;
