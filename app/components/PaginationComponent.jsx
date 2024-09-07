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
      setTotalPages(Math.ceil(petitionLength / 25)); // Calculamos las páginas totales
    }
  }, [petitionLength]);

  const handlePageChange = (page) => {
    setCurrentPage(page); // Cambiamos la página actual
    sessionStorage.setItem("currentPage", page); // Guardamos la página en sessionStorage
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
        <div className="flex justify-center mt-4 space-x-2 mx-3 px-3 motion-safe:animate-pulse">
          <span className=" py-[2px] px-[8px]  bg-gray-300 text-white  border rounded ">
            &lt;
          </span>
          {Array.from(
            { length: Math.ceil(petitionLength / 25) },
            (_, i) => i
          ).map((item, i) => {
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

// import React, { useState, useEffect } from "react"
// import ResponsivePagination from "react-responsive-pagination";

// function PaginationComponent({ currentPage, totalPages,setCurrentPage,SSName,setData}) {

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     sessionStorage.setItem("currentPage", page);
//     const storedData = JSON.parse(sessionStorage.getItem(SSName)) || [];
//     setData(storedData.slice((page - 1) * 25, page * 25));
//   };
//   return (
//     <div className="max-w-xl m-auto mt-5 ">
//       <ResponsivePagination
//         current={currentPage}
//         total={totalPages}
//         onPageChange={handlePageChange}
//         className="flex justify-center mt-4 space-x-2 mx-3 px-3"
//         previousLabel="<"
//         nextLabel=">"
//       />
//     </div>
//   );
// }

// export default PaginationComponent;
