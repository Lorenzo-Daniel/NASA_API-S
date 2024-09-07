import React from "react";
function DataBlock({ title, array }) {
  return (
    <div className="text-xs sm:text-sm  border-l-2 ps-1 sm:ps-4 lg:ps-5">
      <div className="mb-1">
        <span className="  text-start uppercase text-white ">{title}</span>
      </div>
        {array.map((element, index) => {
          return (
            <div key={index}>
              <span className="text-green-500">
                {element.name} :
                <span className="text-white"> {element.value}</span>
              </span>
            </div>
          );
        })}
    </div>
  );
}

export default DataBlock;
