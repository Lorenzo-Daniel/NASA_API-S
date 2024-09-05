export const validateSingleDate = (selectedDate,minDate,setDateErrors,setDateSuccess) => {
   
    const maxDate = new Date().getTime();
    let valid = true;
// 
    if (
      selectedDate === "" ||
      new Date(selectedDate).getTime() <  new Date(minDate).getTime() ||
      new Date(selectedDate).getTime() > maxDate
    ) {
      setDateErrors((prevErrors) => ({
        ...prevErrors,
        selectedDate: {
          error: true,
          message: `Date must be between ${new Date(
            minDate
          ).toLocaleDateString()} and ${new Date(
            maxDate
          ).toLocaleDateString()}.`,
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