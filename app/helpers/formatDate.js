export const dateFormat = (date, separator) => {
  const toDate = new Date(date);
  const year = toDate.getFullYear();
  const month = String(toDate.getMonth() + 1).padStart(2, "0");
  const day = String(toDate.getDate()).padStart(2, "0");
  const formatted = `${year}${separator}${month}${separator}${day}`;
  return formatted;
};

// export  const formatDateRangeComponent = (date) => {
//   if (!date) return "";
//   const toDate = new Date(date)
//   const year = toDate.getFullYear();
//   const month = String(toDate.getMonth() + 1).padStart(2, "0");
//   const day = String(toDate.getDate()  ).padStart(2, "0");
//   return `${year}-${month}-${day }`;
// };
