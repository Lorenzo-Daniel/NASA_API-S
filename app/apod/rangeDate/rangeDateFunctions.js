const minDate = new Date("1995-06-16").getTime();
const maxDate = new Date().getTime();

export const validateDates = ({start, end,setDateErrors,setDateSuccess,prevErrors,prevSuccess}) => {
  let valid = true;

  if (
    start === "" ||
    new Date(start).getTime() < minDate ||
    new Date(start).getTime() > maxDate
  ) {
    setDateErrors((prevErrors) => ({
      ...prevErrors,
      start: {
        error: true,
        message: `Date must be between ${new Date(
          minDate
        ).toLocaleDateString()} and ${new Date(maxDate).toLocaleDateString()}.`,
      },
    }));
    setDateSuccess((prevSuccess) => ({
      ...prevSuccess,
      start: { success: false },
    }));
    valid = false;
    return;
  } else {
    setDateErrors((prevErrors) => ({
      ...prevErrors,
      start: { error: false, message: "" },
    }));
    setDateSuccess((prevSuccess) => ({
      ...prevSuccess,
      start: { success: true },
    }));
  }

  if (
    end === "" ||
    new Date(end).getTime() < minDate ||
    new Date(end).getTime() > maxDate
  ) {
    setDateErrors((prevErrors) => ({
      ...prevErrors,
      end: {
        error: true,
        message: `End date must be between ${new Date(
          minDate
        ).toLocaleDateString()} and ${new Date(maxDate).toLocaleDateString()}.`,
      },
    }));
    setDateSuccess((prevSuccess) => ({
      ...prevSuccess,
      end: { success: false },
    }));
    valid = false;
    return;
  } else {
    setDateErrors((prevErrors) => ({
      ...prevErrors,
      end: { error: false, message: "" },
    }));
    setDateSuccess((prevSuccess) => ({
      ...prevSuccess,
      end: { success: true },
    }));
  }

  if (start && end && new Date(start).getTime() > new Date(end).getTime()) {
    setDateErrors((prevErrors) => ({
      ...prevErrors,
      range: {
        error: true,
        message: "End date cannot be before than the start date.",
      },
    }));
    setDateSuccess((prevSuccess) => ({
      ...prevSuccess,
      range: { success: false },
    }));
    setDateSuccess((prevSuccess) => ({
      ...prevSuccess,
      end: { success: false },
    }));
    valid = false;
    return;
  } else {
    setDateErrors((prevErrors) => ({
      ...prevErrors,
      range: { error: false, message: "" },
    }));
  }

  return valid;
};
