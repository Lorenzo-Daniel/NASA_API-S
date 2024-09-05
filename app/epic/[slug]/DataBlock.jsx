import React from "react";
import TypeWriter from "@/app/components/TypeWryter";
function DataBlock({ title, array }) {
  
 
  return (
    <div className="text-xs">
      <span className="text-white  text-start uppercase">{title}</span>
      {array.map((element, index) => {
        return (
          <div key={index} className=" ">
            <span className="text-green-500" >
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
