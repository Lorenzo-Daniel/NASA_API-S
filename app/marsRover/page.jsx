"use client";
import React, { useEffect, useState } from "react";
import TextComponent from "../components/TextComponent";
import { dataMarsRover } from "./data";
import { getAPI, getAPIPage } from "./functionsMarsRover";
import "react-responsive-pagination/themes/minimal.css";
import PaginationComponent from "../components/PaginationComponent";
import SingleDateForm from "../components/SingleDateForm";
import Main from "./Main";
import { useRouter } from "next/navigation";

//-------------------------------------------

function MarsRover() {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [petitionLength, setPetitionLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  console.log(data);

  useEffect(() => {
    const handlePopState = () => {
      router.replace("/");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);



  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("marsRover")) || [];
    const storedLength =
      JSON.parse(sessionStorage.getItem("marsRoverLength")) || 0;
    const storedDate = sessionStorage.getItem("marsRoverSelectedDate");
    const storedPage = parseInt(sessionStorage.getItem("currentPage"), 10) || 1;

    if (storedData.length > 0) {
      setData(storedData);
      setPetitionLength(storedLength);
      setSelectedDate(storedDate ? JSON.parse(storedDate) : "");
      setCurrentPage(storedPage);
    }
  }, []);

  useEffect(() => {
    if (selectedDate && currentPage > 1) {
      getAPIPage(selectedDate, currentPage, setData, setIsLoading);
    }
  }, [currentPage, selectedDate]);

  const searchData = async (e) => {
    e.preventDefault();

    if (selectedDate) {
      setCurrentPage(1);
      await getAPI(selectedDate, setData, setPetitionLength, setIsLoading);
    } else {
      setError({ error: true, message: "You must enter a date" });
    }
  };

  return (
    <main className="relative">
      <TextComponent
        title={dataMarsRover.mainComponent?.title}
        text1={dataMarsRover.mainComponent.text1}
      />

      <SingleDateForm
        searchData={searchData}
        error={error}
        setError={setError}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        isLoading={isLoading}
      />

      {petitionLength > 25 && (
        <div className={`"max-w-xl m-auto my-10  "`}>
          <PaginationComponent
            petitionLength={petitionLength}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setData={setData}
            isLoading={isLoading}
          />
        </div>
      )}

      <Main data={data} isLoading={isLoading} />
    </main>
  );
}

export default MarsRover;

// "use client";
// import React, { useEffect, useState } from "react";
// import TextComponent from "../components/TextComponent";
// import { dataMarsRover } from "./data";
// import { getAPI } from "./functionsMarsRover";
// import "react-responsive-pagination/themes/minimal.css";
// import PaginationComponent from "../components/PaginationComponent";
// import SingleDateForm from "../components/SingleDateForm";
// import Main from "./Main";

// //------------------------------------------

// function MarsRover() {
//   const [data, setData] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [petitionLength, setPetitionLength] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState({ error: false, message: "" });
//   const [currentPage, setCurrentPage] = useState(1);

//   const searchData = async (e) => {
//     e.preventDefault();

//     if (selectedDate) {
//       await getAPI(selectedDate, setData, setPetitionLength, setIsLoading);
//     } else {
//       setError({ error: true, message: "You must enter a date" });
//     }
//   };

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const savedPage =
//         parseInt(sessionStorage.getItem("currentPage"), 10) || 1;
//       setCurrentPage(savedPage);
//       if (typeof window !== "undefined") {
//         const storedData =
//           JSON.parse(sessionStorage.getItem("marsRover")) || [];
//         setPetitionLength(storedData.length);
//         setData(storedData.slice((savedPage - 1) * 24, savedPage * 24));
//       }
//     }
//   }, [currentPage]);

//   return (
//     <main className="relative">
//       <TextComponent
//         title={dataMarsRover.mainComponent?.title}
//         text1={dataMarsRover.mainComponent.text1}
//       />

//       <SingleDateForm
//         searchData={searchData}
//         error={error}
//         setError={setError}
//         setSelectedDate={setSelectedDate}
//         selectedDate={selectedDate}
//         isLoading={isLoading}
//       />

//       <div className="max-w-xl m-auto my-10 ">
//         <PaginationComponent
//           petitionLength={petitionLength} // Pasar el tamaño total al hijo
//           currentPage={currentPage}
//           setCurrentPage={setCurrentPage}
//           setData={setData}
//           SS={'marsRover'}
//         />
//       </div>

//       <Main data={data} isLoading={isLoading} />
//     </main>
//   );
// }

// export default MarsRover;
