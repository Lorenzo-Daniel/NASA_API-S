import React from "react";

function DataBlock({ title, array }) {
  return (
    <div className="2xl:w-80 border p-5 ">
      <h4 className="text-white text-start uppercase">{title}</h4>
      {array.map((element, index) => {
        return (
          <div key={index} className=" p-1 flex flex-col items-start flex-fill">
            <span className="text-white" >
              {element.name}
              <span className="text-white">: {element.value}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default DataBlock;
