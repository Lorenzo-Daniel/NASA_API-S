
import { swalError } from "../helpers/swal";


export   const getAPI = async (date,setIsLoading,setData) => {
    try {
      setIsLoading(true);
      const request = await fetch(
        `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=DEMO_KEY`
      );
      const response = await request.json();
      console.log(response);

      if (response.length) {
        sessionStorage.setItem("NASA-EPIC", JSON.stringify(response));
        setIsLoading(false);
        setData(response);
      } else {
        swalError("We dont have pictures for this date! Try another date!");
        setIsLoading(false);
      }
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
        swalError("Something went wrong! Check your connection and try again!");
      }, 3000);
      console.error(error);
    }
  };
