import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2";

export const minDate = new Date("2015-07-5").getTime();
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

export const getAPI = async (
  selectedDate,
  setSelectedDate,
  setDateErrors,
  setDateSuccess,
  setData,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const request = await fetch(
      `https://api.nasa.gov/EPIC/api/natural/date/${selectedDate}?api_key=DEMO_KEY`
    );
    const response = await request.json();
    sessionStorage.setItem("NASA-EPIC", JSON.stringify(response));
    setDateErrors({
      selectedDate: { error: false, message: "" },
    });
    setDateSuccess({
      selectedDate: { success: false },
    });

    setData(response);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  } catch (error) {
    setTimeout(() => {
      setIsLoading(false);
      Swal.fire({
        title: "Something went wrong! Try again!",
        showConfirmButton: false,
        showCloseButton: true,
        customClass: {
          popup: "h-60",
          title: "font-extralight ",
          closeButton: "hover:text-gray-500",
        },
      });
    }, 3000);
    console.error(error, "estes es el error");
  }
};
