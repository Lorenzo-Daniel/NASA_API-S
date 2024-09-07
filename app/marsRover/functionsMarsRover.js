import { swalError } from "../helpers/swal";
import { dateFormatForCall } from "../helpers/formatDate";
export const getAPI = async (
  selectedDate,
  setData,
  setPetitionLength,
  setIsLoading
) => {
  try {
const formatted = dateFormatForCall(selectedDate,'-')
console.log(formatted,'formatted');

    setIsLoading(true);
    const API_KEY = "teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj";
    const response = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${formatted}&api_key=${API_KEY}`
    );
    const res = await response.json();

    if (res?.photos.length === 0) {
      setTimeout(() => {
        setIsLoading(false);
        swalError("We don't have photos for this date. Try another date!");
      }, 5000);
    } else {
      const firstPage = res.photos.slice(0, 25);  // Primeros 25 resultados
      sessionStorage.setItem("marsRover", JSON.stringify(firstPage));
      sessionStorage.setItem("marsRoverLength", JSON.stringify(res.photos.length));
      sessionStorage.setItem("marsRoverSelectedDate", JSON.stringify(formatted));
      setPetitionLength(res.photos.length);  // Longitud total de la petición
      setData(firstPage);  // Mostramos solo los primeros 25 resultados
      setIsLoading(false);
    }
  } catch (error) {
    setTimeout(() => {
      setIsLoading(false);
      swalError("Something went wrong! Check your internet connection and Try again!");
    }, 3000);
    console.error("Error fetching Mars Rover data:", error);
  }
};

export const getAPIPage = async (
  selectedDate,
  currentPage,
  setData,
  setIsLoading
) => {
  try {
   const getSS = JSON.parse(sessionStorage.getItem('marsRoverSelectedDate'))
    setIsLoading(true);
    const API_KEY = "teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj";
    const response = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${getSS}&page=${currentPage}&api_key=${API_KEY}`
    );
    const res = await response.json();

    if (res?.photos.length === 0) {
      setIsLoading(false);
      swalError("No photos available for this page.");
    } else {
      sessionStorage.setItem("marsRover", JSON.stringify(res.photos)); // Guardamos solo la página actual
      sessionStorage.setItem("currentPage", currentPage); // Actualizamos la página
      setData(res.photos); // Mostramos solo los resultados de la página actual
      setIsLoading(false);
    }
  } catch (error) {
    setIsLoading(false);
    swalError("Something went wrong! Try again.");
    console.error("Error fetching paginated Mars Rover data:", error);
  }
};

// import { swalError } from "../helpers/swal";

// export const getAPI = async (
//   selectedDate,
//   setData,
//   setPetitionLength,
//   setIsLoading
// ) => {
//   try {
//     setIsLoading(true);
//     const API_KEY = "teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj";
//     const response = await fetch(
//       `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${selectedDate}&page=1&api_key=${API_KEY}`
//     );
//     const res = await response.json();
//     console.log(res);



//     if (res?.photos.length === 0) {
//       setTimeout(() => {
//         setIsLoading(false);
//         swalError("We don't have photos for this date. Try another date!");
//       }, 5000);
//     } else {
//       sessionStorage.setItem("marsRover", JSON.stringify(res.photos));
//       setPetitionLength(res.photos.length); // Seteamos el tamaño total aquí
//       setData(res.photos.slice(0, 25)); // Muestra solo las primeras 25 imágenes
//       setIsLoading(false);
//     }
//   } catch (error) {
//     setTimeout(() => {
//       setIsLoading(false);
//       swalError("Something went wrong! Check your internet conection and Try again!");
//     }, 3000);
//     console.error(
//       "Ocurrió un error al obtener los datos meteorológicos de Marte:",
//       error
//     );
//   }
// };
