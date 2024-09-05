import React, { useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import { GoScreenFull } from "react-icons/go";
import { swalFullImg } from "../helpers/swal";

function InnerImageZoomComponent({ url, date }) {
  const [fullImg, setFullImg] = useState(false);

  return (
    <div className="relative">
      <div>
        <InnerImageZoom
          className="rounded"
          src={url}
          zoomSrc={url}
          zoomScale={1}
          zoomType="click"
          moveType="drag"
          hideCloseButton={true}
        />
        <div className="absolute bottom-3 right-3 cursor-pointer">
          <GoScreenFull
            color="white"
            size={22}
            onClick={() => setFullImg((prev) => !prev)}
          />
        </div>
        <span className="absolute text-white left-3 bottom-3">{date}</span>
      </div>
      {fullImg && swalFullImg(url, setFullImg)}
    </div>
  );
}

export default InnerImageZoomComponent;
