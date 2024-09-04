import React from "react";
import RangeDatePickerComponent from "./RangeDatePickerComponent";
import Button from "./Button";
import { CircleLoader } from "react-spinners";
function RangeDateForm({
  searchData,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  error,
  setError,
  isLoading,
}) {

  console.log(error);
  
  return (
    <form onSubmit={searchData} className="flex justify-center mt-10">
    <div className="flex flex-col sm:flex-row items-center gap-4 relative ">
    <RangeDatePickerComponent
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        error={error}
        setError={setError}
      />
      <div className="flex justify-center ">
        <div>
          {!isLoading ? (
            <Button type={"submit"} action={"Search"} />
          ) : (
            <CircleLoader color={"#a2a4a7"} size={50} />
          )}
        </div>
      </div>
    </div>
  </form>
  );
}

export default RangeDateForm;
