import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2";



export const getAPI = async (
  selectedDate,
  setData,
  setIsLoading,
  setPetitionLength
) => {
  try {
    setIsLoading(true);
    const API_KEY = "teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj";
    const response = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${selectedDate}&api_key=${API_KEY}`
    );
    const res = await response.json();

    if (res?.photos.length === 0) {
      setTimeout(() => {
        setIsLoading(false);
        Swal.fire({
          title: "We don't have photos for this date. Try another date!",
          showConfirmButton: false,
          showCloseButton: true,
          customClass: {
            popup: "h-60",
            title: "font-extralight",
            closeButton: "hover:text-gray-500",
          },
        });
      }, 3000);
    } else {
      // Guarda todos los resultados en sessionStorage
      sessionStorage.setItem("marsRover", JSON.stringify(res.photos));
      setPetitionLength(res.photos.length); // Establece la longitud total de resultados
      setData(res.photos.slice(0, 25)); // Muestra solo las primeras 25 imágenes
      setIsLoading(false);
    }
  } catch (error) {
    setTimeout(() => {
      setIsLoading(false);
      Swal.fire({
        title: "Something went wrong! Try again!",
        showConfirmButton: false,
        showCloseButton: true,
        customClass: {
          popup: "h-60",
          title: "font-extralight",
          closeButton: "hover:text-gray-500",
        },
      });
    }, 3000);
    console.error(
      "Ocurrió un error al obtener los datos meteorológicos de Marte:",
      error
    );
  }
};

const arrayForSkeleton = Array.from({ length: 20 }, (_, i) => i + 1); 
