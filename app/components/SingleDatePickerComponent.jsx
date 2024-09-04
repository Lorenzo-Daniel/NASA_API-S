import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SingleDatePickerComponent({
  error,
  setError,
  setSelectedDate,
  selectedDate,
}) {
  const formatedDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate() + 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (date) => {
    setSelectedDate(formatedDate(date));
    setError({ error: false, message: "" });
  };

  return (
    <div className="relative">
      <div>
        <DatePicker
          popperPlacement="bottom-start"
          portalId="root-portal"
          placeholderText="Enter a date"
          selected={selectedDate ? new Date(selectedDate) : null}
          onChange={handleChange}
          maxDate={new Date()}
          minDate={new Date("1995-06-16")}
          dateFormat="yyyy/MM/dd"
          showMonthDropdown
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          showFullMonthYearPicker
          className="h-14 p-2 border border-gray-300 rounded-md focus:outline-none border border-slate-400 w-80 text-center align cursor-pointer hover:bg-gray-200 bg-gray-100	"
          calendarClassName="w-80 bg-red-500 border border-gray-200 shadow-lg rounded-md p-3 datepicker"
          dayClassName={(date) =>
            "w-12 h-7 lg:h-10  flex items-center justify-center text-sm"
          }
        />
      </div>
      {error.error && ( 
        <span
          className="text-sm text-red-500 absolute left-1"
        >
          {error.message}
        </span>
      )}
    </div>
  );
}

export default SingleDatePickerComponent;
