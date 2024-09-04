import React from "react";
import Button from "./Button";
import { CircleLoader } from "react-spinners";
import SingleDatePickerComponent from "./SingleDatePickerComponent";




function SingleDateForm({
  searchData,
  error,
  setError,
  setSelectedDate,
  selectedDate,
  isLoading,
}) {
  return (
    
    <form onSubmit={searchData} className="flex justify-center mt-10">
      <div className="flex flex-col sm:flex-row items-center gap-4 relative ">
        <SingleDatePickerComponent
          error={error}
          setError={setError}
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
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

export default SingleDateForm;
