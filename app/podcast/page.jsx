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

//-------------------------------------------

function Podcast() {
  const [data, setData] = useState([]);
  const [audioLinks, setAudioLinks] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter(); // Usar el router del cliente
  const [currentPage, setCurrentPage] = useState(1);
  const [petitionLength, setPetitionLength] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = JSON.parse(sessionStorage.getItem("NASA-podcast"));
      if (storedData) {
        setData(storedData);
        setLoading(true);
        await fetchAudioLinks(storedData);
      } else {
        getAPI();
      }
    };
    fetchData();
  }, []);

  const getAPI = async () => {
    setLoading(true);
    try {
      const requestPone = await fetch(
        `https://images-api.nasa.gov/search?q=HWHAP&page_size=25&page=1`
      );

      const dataOne = await requestPone.json();

      console.log(dataOne);

      console.log(dataOne.collection.metadata.total_hits);

      const sortedData = (data) =>
        data.sort(
          (a, b) => new Date(b.date_created) - new Date(a.date_created)
        );
      const spreadItems = (data) =>
        data.map((item, i) => ({
          ...item.data[0],
          href: item.href,
        }));

      const getItems = (data) =>
        data.collection.items.map((item, i) => ({ ...item }));

      const ItemsUno = getItems(dataOne);
      const spreadUno = spreadItems(ItemsUno);
      const spreadItemUno = sortedData(spreadItems(getItems(dataOne)));
console.log(spreadItemUno);


      setPetitionLength(dataOne.collection.metadata.total_hits);
      // console.log('spreadItemUno',spreadItemUno);

      // sessionStorage.setItem("NASA-podcast", JSON.stringify(spreadItemUno));
      await fetchAudioLinks(spreadItemUno);
      setData(spreadItemUno);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        swalError("Something went wrong! reload and verify your conection!");
      }, 3000);
      console.error("Ocurrió un error al obtener los datos Nasa Src:", error);
    }
  };

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

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    router.push(
      `/podcast/${selectedOption.value
        .replace(/^HWHAP\s*/, "")
        .replace(/[#\?&]/g, "")
        .trim()}`
    ); // Redirige al slug seleccionado
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
              loading
                ? "px-2 animate__animated animate__fadeIn animate__infinite animate__slow max-w-sm m-auto border border-gray-300 rounded"
                : "max-w-sm m-auto px-2"
            }`}
            isDisabled={loading}
            placeholder="Select chapter..."
          />
        </div>
        {petitionLength > 24 && (
          <PaginationComponent
            petitionLength={petitionLength}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setData={setData}
            SS={""}
          />
        )}

        <div className="flex justify-center mt-10">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 p-2">
            {!loading
              ? data.map((item, i) => (
                  <div key={i}>
                    <AudioComponent
                      data={item}
                      audioLink={audioLinks[i]}
                      showButton={true}
                    />
                  </div>
                ))
              : Array.from({ length: 20 }, (_, i) => i).map((_, i) => (
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

// const getAPI = async () => {
//   setLoading(true);
//   try {
//     const requestPone = await fetch(
//       `https://images-api.nasa.gov/search?q=HWHAP&page_size=25&page=6`
//     );
//     const requestPTwo = await fetch(
//       `https://images-api.nasa.gov/search?q=HWHAP&page=2`
//     );
//     const requestPtree = await fetch(
//       `https://images-api.nasa.gov/search?q=HWHAP&page=3`
//     );

//     const dataOne = await requestPone.json();
//     const dataTwo = await requestPTwo.json();
//     const dataTree = await requestPtree.json();

//     const sortedData = (data) =>
//       data.sort(
//         (a, b) => new Date(b.date_created) - new Date(a.date_created)
//       );
//     const spreadItems = (data) =>
//       data.map((item, i) => ({
//         ...item.data[0],
//         href: item.href,
//       }));

//     const getItems = (data) =>
//       data.collection.items.map((item, i) => ({ ...item }));

//     const ItemsUno = getItems(dataOne);
//     const ItemsDos = getItems(dataTwo);
//     // console.log('ItemsUno',ItemsUno);
//     // console.log('ItemsDos',ItemsDos);

//     const spreadUno = spreadItems(ItemsUno);
//     const spreadDos = spreadItems(ItemsDos);
//     console.log(spreadUno);
// console.log(spreadDos);

// // console.log([...spreadUno,...spreadDos]);

//     // console.log('spreadUno',spreadUno);
//     // console.log('spreadDos',spreadDos);

//     const spreadItemUno = spreadItems(getItems(dataOne));

// // console.log('spreadItemUno',spreadItemUno);

// const sortedItemsUnoDos = sortedData([...spreadUno,...spreadDos])
// console.log('sortedItemsUnoDos',sortedItemsUnoDos);

//     // sessionStorage.setItem("NASA-podcast", JSON.stringify(sortedItemsUnoDos));
//     // await fetchAudioLinks(sortedItemsUnoDos);
//     // setData(sortedData);
//   } catch (error) {
//     setTimeout(() => {
//       setLoading(false);
//       swalError("Something went wrong! reload and verify your conection!");
//     }, 3000);
//     console.error("Ocurrió un error al obtener los datos Nasa Src:", error);
//   }
// };

// "use client";
// import React, { useEffect, useState } from "react";
// import { dataPodcast } from "./data";
// import Select from "react-select";
// import { useRouter } from "next/navigation"; // Cambié "next/router" a "next/navigation"
// import { swalError } from "../helpers/swal";
// import TextComponent from "../components/TextComponent";
// import AudioComponent from "../components/AudioComponent";
// import { mock } from "./mock";
// //-------------------------------------------

// function Podcast() {
//   const [data, setData] = useState([]);
//   const [audioLinks, setAudioLinks] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const router = useRouter(); // Usar el router del cliente

//   useEffect(() => {
//     const fetchData = async () => {
//       const storedData = JSON.parse(sessionStorage.getItem("NASA-podcast"));
//       if (storedData) {
//         setData(storedData);
//         setLoading(true);
//         await fetchAudioLinks(storedData);
//       } else {
//         getAPI();
//       }
//     };
//     fetchData();
//   }, []);

//   const getAPI = async () => {
//     setLoading(false);
//     try {
//       const requestPone = await fetch(
//         `https://images-api.nasa.gov/search?q=HWHAP&page_size=25&page=6`
//       );

//       const dataOne = await requestPone.json();

//       console.log(dataOne);

//       console.log(dataOne.collection.metadata.total_hits);

//       const sortedData = (data) =>
//         data.sort(
//           (a, b) => new Date(b.date_created) - new Date(a.date_created)
//         );
//       const spreadItems = (data) =>
//         data.map((item, i) => ({
//           ...item.data[0],
//           href: item.href,
//         }));

//       const getItems = (data) =>
//         data.collection.items.map((item, i) => ({ ...item }));

//       const ItemsUno = getItems(dataOne);
//       const spreadUno = spreadItems(ItemsUno);
//       const spreadItemUno = spreadItems(getItems(dataOne));

//       // console.log('spreadItemUno',spreadItemUno);

//       // sessionStorage.setItem("NASA-podcast", JSON.stringify(sortedItemsUnoDos));
//       // await fetchAudioLinks(sortedItemsUnoDos);
//       // setData(sortedData);
//     } catch (error) {
//       setTimeout(() => {
//         setLoading(false);
//         swalError("Something went wrong! reload and verify your conection!");
//       }, 3000);
//       console.error("Ocurrió un error al obtener los datos Nasa Src:", error);
//     }
//   };

//   const fetchAudioLinks = async (data) => {
//     const links = {};
//     await Promise.all(
//       data.map(async (element, index) => {
//         setLoading(true);
//         if (!audioLinks[index]) {
//           const audioLink = await reRequestlink(element.href);
//           links[index] = audioLink;
//         }
//       })
//     );
//     setAudioLinks((prevLinks) => ({ ...prevLinks, ...links }));
//     setLoading(false);
//   };

//   const handleSelectChange = (selectedOption) => {
//     setSelectedOption(selectedOption);
//     router.push(
//       `/podcast/${selectedOption.value
//         .replace(/^HWHAP\s*/, "")
//         .replace(/[#\?&]/g, "")
//         .trim()}`
//     ); // Redirige al slug seleccionado
//   };

//   const reRequestlink = async (href) => {
//     try {
//       const request = await fetch(href);
//       const res = await request.json();
//       return res[0];
//     } catch (error) {
//       swalError("We cant load de Audios");
//       return null;
//     }
//   };

//   const selectOptions = data.map((item) => ({
//     value: item.title, // Puedes ajustar cómo se construye el valor
//     label: item.title.replace(/^HWHAP\s*/, ""),
//   }));

//   return (
//     <div>
//       <TextComponent
//         title={dataPodcast.mainComponent.title}
//         text1={dataPodcast.mainComponent.text1}
//       />

//       <div>
//         <div className="mt-5 w-sm ">
//           <Select
//             value={selectedOption}
//             onChange={handleSelectChange}
//             options={selectOptions}
//             className={`${
//               loading
//                 ? "px-2 animate__animated animate__fadeIn animate__infinite animate__slow max-w-sm m-auto border border-gray-300 rounded"
//                 : "max-w-sm m-auto px-2"
//             }`}
//             isDisabled={loading}
//             placeholder="Select chapter..."
//           />
//         </div>

//         <div className="flex justify-center mt-10">
//           <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 p-2">
//             {!loading
//               ? data.map((item, i) => (
//                   <div key={i}>
//                     <AudioComponent
//                       data={item}
//                       audioLink={audioLinks[i]}
//                       showButton={true}
//                     />
//                   </div>
//                 ))
//               : Array.from({ length: 20 }, (_, i) => i).map((_, i) => (
//                   <div
//                     key={i}
//                     className="flex flex-col border border-slate-300 p-2 w-44  md:w-64 xl:w-80 animate__animated animate__fadeIn animate__infinite 	 animate__slow"
//                   >
//                     <span className="mb-1 h-3 bg-gray-300 w-40" />
//                     <div className="bg-gray-200   flex  items-center justify-center  h-32 md:h-28">
//                       <span className="w-32 sm:w-44 p-5 bg-zinc-300 mx-5" />
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="mt-1 sm:px-3 w-14 h-3   px-1 sm:py-1 bg-gray-300 " />
//                       <span className="mt-1 sm:px-3 w-10 h-3  px-1 sm:py-1 bg-gray-300" />
//                     </div>
//                   </div>
//                 ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Podcast;
