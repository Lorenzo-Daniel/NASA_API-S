import React, { useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { TiTick } from "react-icons/ti";

function InputDate({ label, mainDate,initialDate, setSelectedDate, name,setValidatedForm}) {
  const minDate = new Date("1995-06-16").getTime();
  const maxDate = new Date().getTime();

  const [dateErrors, setDateErrors] = useState({
    start: { error: false, message: "" },
    end: { error: false, message: "" },
  });
  const [dateSuccess, setDateSuccess] = useState({
    start: { success: false },
    end: { success: false },
  });

  const validateDates = (date, name) => {
    let valid = true;

    if (
      new Date(date).getTime() < minDate ||
      new Date(date).getTime() > maxDate
    ) {
      setDateErrors((prevErrors) => ({
        ...prevErrors,
        [name]: {
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
        [name]: { success: false },
      }));
      valid = false;
      return;
    } else if(new Date(initialDate).getTime() > new Date(date).getTime() ) { 
        setDateErrors((prevErrors) => ({
            ...prevErrors,
            [name]: {
              error: true,
              message: `The end date cannot be less than the start date`,
            },
          }));
          setDateSuccess((prevSuccess) => ({
            ...prevSuccess,
            [name]: { success: false },
          }));
          valid = false;
          return;
    }else {
      setDateErrors((prevErrors) => ({
        ...prevErrors,
        [name]: { error: false, message: "" },
      }));
      setDateSuccess((prevSuccess) => ({
        ...prevSuccess,
        [name]: { success: true },
      }));
    }
    setValidatedForm(valid)
  };

  return (
    <div className="h-24 flex flex-col">
      <div className="flex justify-start items-center">
        <label className="text-md text-black-700 font-light ">{label}</label>
      </div>
      <div className="flex-column items-center">
        <div className="flex items-center ">
          <input
            type="date"
            name={name}
            className="w-72 sm:h-16 h-10 border cursor-pointer focus:outline-none px-2 rounded text-gray-700 font-light hover:bg-gray-100"
            value={mainDate}
            onChange={(e) => {
              validateDates(e.target.value, name);
              setSelectedDate(e.target.value);
            }}
          />
          {dateErrors?.[name].error && (
            <RiErrorWarningFill className="text-red-300 text-2xl ml-1 font-light " />
          )}
          {dateSuccess?.[name].success && (
            <TiTick className="text-green-700 text-2xl ml-1 font-light" />
          )}
        </div>
      </div>

      {dateErrors?.[name].error && (
        <div className="text-red-500 text-start text-xs mt-1">
          {dateErrors?.[name].message}
        </div>
      )}
      {/* {secondaryDate && name === 'end' && dateErrors?.[name].range && (
      <div className="text-red-500 text-start text-xs mt-1">
        {dateErrors?.[name].message}
      </div>
    )} */}
    </div>
  );
}

export default InputDate;
