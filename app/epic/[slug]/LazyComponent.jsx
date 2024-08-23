import React from "react";
import InnerImageZoom from "react-inner-image-zoom";

function LazyComponent(formattedDate, image, identifier, date) {
  return (
    <>
      <div className="md:max-w-3xl">
        <InnerImageZoom
          src={`https://epic.gsfc.nasa.gov/archive/natural/${formattedDate}/png/${image}.png`}
          zoomSrc={`https://epic.gsfc.nasa.gov/archive/natural/${formattedDate}/png/${image}.png`}
          zoomScale={1}
          zoomType="click"
          moveType="drag"
          hideCloseButton={true}
        />
        <div className="text-center mt-3">
          <span>{identifier}</span>
          <span>{date}</span>
        </div>
      </div>
    </>
  );
}

export default LazyComponent;
