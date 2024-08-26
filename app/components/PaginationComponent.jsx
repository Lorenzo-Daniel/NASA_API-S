import React, { useState, useEffect } from "react"
import ResponsivePagination from "react-responsive-pagination";

function PaginationComponent({ currentPage, totalPages,setCurrentPage,SSName,setData}) {

  const handlePageChange = (page) => {
    setCurrentPage(page);
    sessionStorage.setItem("currentPage", page);
    const storedData = JSON.parse(sessionStorage.getItem(SSName)) || [];
    setData(storedData.slice((page - 1) * 25, page * 25));
  };
  return (
    <div className="max-w-xl m-auto mt-5 ">
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={handlePageChange}
        className="flex justify-center mt-4 space-x-2 mx-3 px-3"
        previousLabel="<"
        nextLabel=">"
      />
    </div>
  );
}

export default PaginationComponent;
