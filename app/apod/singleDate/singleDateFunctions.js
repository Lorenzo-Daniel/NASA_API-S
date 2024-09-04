












const getAPI = async (selectedDate,setIsLoading,setData) => {
  try {
    setIsLoading(true);
    const request = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj&date=${selectedDate}&concept_tags=True`
    );
    const response = await request.json();
    setIsLoading(false);
    setData(response);
  } catch (error) {
    setTimeout(() => {
      setIsLoading(false);
      swal("Something went wrong! Check your connection and try again!");
    }, 3000);
    console.error(error);
  }
};



export const searchData = (e,selectedDate,setError) => {
    e.preventDefault();

    if (selectedDate) {
      setError({ error: true, messagge: "" });
      const formatted = dateFormat(selectedDate, "-");
      getAPI(formatted);
    } else {
      setError({ error: true, message: "You must enter a date" });
    }
  };
