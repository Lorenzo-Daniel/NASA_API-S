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
      {/* {spinner && <PopUp />} */}
<input type="date" name="date" id="date" onChange={(e)=> getDate(e)} />
<Link href={'/APOD/SelectSingleDate'}>APO</Link>
      {showResults ? (
        <div style={{ backgroundColor: "#67e8fe", height: "100vh" }}>
          <div className="">
            <Link href={"/APOD"} className="">
              Back
              <i className="" />
            </Link>
          </div>
          <div className="">
            <p className="">You have not selected any search option!</p>
            {/* <div className="">
              <img
                src={astronaut}
                style={{ maxWidth: "350px" }}
                alt="astronaut"
                className="img-fluid w-50"
              />
            </div> */}
          </div>
        </div>
      ) : (
        <div>
          {data.map((object, index) => {
            return (
              <div key={index}>
                <div className="">
                  {object.media_type === "video" ? (
                    <ReactPlayer
                      url={object.url}
                      controls
                      width={"100%"}
                      style={{ padding: "18px" }}
                    />
                  ) : (
                    <img
                      id={index}
                      src={object.url}
                      className=""
                      style={{ cursor: "pointer" }}
                      alt={object.title}
                      // onClick={() => popUpImgGaleria(object.url, object.title)}
                    />
                  )}
                  <p className="">{object.date}</p>
                </div>
                <div className="">
                  <h6 className="">{object.title}</h6>
                  <div className="">
                    <button
                      className=""
                      onClick={() => dropDownExplanationHandler(index)}
                    >
                      {/* <Span>Explanation</Span> */}
                      <i className="" />
                    </button>
                    <p
                      className={
                        index === dropDownExplanationIndex && !dropDownHandler
                          ? " "
                          : ""
                      }
                    >
                      {object.explanation}
                    </p>
                  </div>
                  <div className="">
                    {wiki[index].map((element, i) => {
                      return (
                        <div className=" " key={i}>
                          <a
                            href={`https://en.wikipedia.org/?curid=${element.pageid}`}
                            target="_blanck"
                          >
                            {element.title}
                          </a>
                          <div>
                            <p>{element.snippet}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Apod;
