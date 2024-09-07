import React, { useState, useEffect } from "react";
import ResponsivePagination from "react-responsive-pagination";

function PaginationComponent({
  petitionLength,
  currentPage,
  setCurrentPage,
  isLoading,
}) {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (petitionLength > 0) {
      setTotalPages(Math.ceil(petitionLength / 25)); 
    }
  }, [petitionLength]);

  const handlePageChange = (page) => {
    setCurrentPage(page); 
    sessionStorage.setItem("currentPage", page); 
  };

  return (
    <div className="max-w-xl m-auto mt-5 ">
      {!isLoading ? (
        <div>
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={handlePageChange}
            className="flex justify-center mt-4 space-x-2 mx-3 px-3 "
            previousLabel="<"
            nextLabel=">"
          />
        </div>
      ) : (
        <div className="flex justify-center mt-4 space-x-2 mx-3 px-3  animate__animated animate__fadeIn animate__infinite animate__slow">
          <span className=" py-[2px] px-[8px]  bg-gray-300 text-white  border rounded ">
            &lt;
          </span>
          {Array.from(
            { length:7 },
            (_, i) => i
          ).map((_, i) => {
            return (
              <span key={i} className=" py-[2px] px-[8px]  bg-gray-300 text-white  border rounded ">
                {i + 1}
              </span>
            );
          })}

          <span className=" py-[2px] px-[8px] bg-gray-300 text-white   border rounded ">
            &gt;
          </span>
        </div>
      )}
    </div>
  );
}

export default PaginationComponent;

