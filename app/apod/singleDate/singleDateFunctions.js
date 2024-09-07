import { swalError } from "@/app/helpers/swal";

export   const getAPI = async (date,setIsLoading,setData) => {
    try {
      setIsLoading(true);
      const request = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj&date=${date}&concept_tags=True`
      );
      const response = await request.json();
      setIsLoading(false);
      setData(response);
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
        swalError("Something went wrong! Check your connection and try again!");
      }, 3000);
      console.error(error);
    }
  };
