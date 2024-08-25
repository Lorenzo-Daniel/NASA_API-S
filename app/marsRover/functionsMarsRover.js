import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2";

export const minDate = new Date("2013-01-01").getTime();
const maxDate = new Date().getTime();

export const validateDates = (selectedDate, setDateErrors, setDateSuccess) => {
  let valid = true;

  if (
    selectedDate === "" ||
    new Date(selectedDate).getTime() < minDate ||
    new Date(selectedDate).getTime() > maxDate
  ) {
    setDateErrors((prevErrors) => ({
      ...prevErrors,
      selectedDate: {
        error: true,
        message: `Date must be between ${new Date(
          minDate
        ).toLocaleDateString()} and ${new Date(maxDate).toLocaleDateString()}.`,
      },
    }));
    setDateSuccess((prevSuccess) => ({
      ...prevSuccess,
      selectedDate: { success: false },
    }));
    valid = false;
    return;
  } else {
    setDateErrors((prevErrors) => ({
      ...prevErrors,
      selectedDate: { error: false, message: "" },
    }));
    setDateSuccess((prevSuccess) => ({
      ...prevSuccess,
      selectedDate: { success: true },
    }));
  }
  return valid;
};

// Actualiza la función getAPI para manejar paginación y almacenamiento en sessionStorage
export const getAPI = async (
  selectedDate,
  setData,
  setIsLoading,
  currentPage,
  setPetitionLength
) => {
  try {
    setIsLoading(true);
    const API_KEY = "teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj";
    const response = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${selectedDate}&page=${currentPage}&api_key=${API_KEY}`
    );
    const res = await response.json();

    // Establecer la longitud total de los resultados en la primera búsqueda
    if (currentPage === 1 && res.photos.length > 0) {
      try {
        const response = await fetch(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${selectedDate}&api_key=${API_KEY}`
        );
        const res = await response.json();
        setPetitionLength(res.photos.length);
      } catch (error) {
        console.error('error en el segundo try :' ,error)
      }
    }

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
      // Almacena solo la página actual en sessionStorage
      sessionStorage.setItem("marsRover", JSON.stringify(res?.photos));
      setData(res?.photos);
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
