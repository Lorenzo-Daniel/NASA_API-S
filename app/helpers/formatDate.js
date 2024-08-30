export const formatDateSingleDateComponent = (date) => {
    const toDate = new Date(date);
    const year = toDate.getFullYear();
    const month = String(toDate.getMonth() + 1).padStart(2, "0");
    const day = String(toDate.getDate()).padStart(2, "0");
    const formated = `${year}-${month}-${day}`;
    return formated;
  };

  export   const formatDateRangeComponent = (date) => {
    if (!date) return "";
    const toDate = new Date(date)
    const year = toDate.getFullYear();
    const month = String(toDate.getMonth() + 1).padStart(2, "0");
    const day = String(toDate.getDate()  ).padStart(2, "0");
    return `${year}-${month}-${day }`;
  };