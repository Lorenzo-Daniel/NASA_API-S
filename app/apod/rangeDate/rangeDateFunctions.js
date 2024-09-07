import { swalError } from "@/app/helpers/swal";



export const getAPI = async (start, end,setIsLoading,setShowRango,setData) => {
  try {
    setIsLoading(true);
    setShowRango({ isTrue: false });
    const request = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj&start_date=${start}&end_date=${end}`
    );
    const response = await request.json();
    sessionStorage.setItem("NASA-pictures", JSON.stringify(response));
    sessionStorage.setItem(
      "ApodRange",
      JSON.stringify({
        start: start.replace(/-/g, "/"),
        end: end.replace(/-/g, "/"),
        isTrue: true,
      })
    );
    setShowRango({
      start: start.replace(/-/g, "/"),
      end: end.replace(/-/g, "/"),
      isTrue: true,
    });
    setIsLoading(false);
    setData(response);
  } catch (error) {
    setTimeout(() => {
      setIsLoading(false);
      swalError("Something went wrong! Try again!");
    }, 3000);
    console.error(error);
  }
};
