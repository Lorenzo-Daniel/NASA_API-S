"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";


function Details() {
  const { slug } = useParams();
  const getSS = JSON.parse(sessionStorage.getItem("NASA-pictures")) || [];
  const [currentObject, setCurrentObject] = useState(null); // Cambiado a null para manejar mejor la carga inicial
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const findObject = () => {
      const title = decodeURIComponent(slug);
      const find = getSS.find((element) => element.title === title);
      setCurrentObject(find);
    };

    findObject();
  }, [slug]); // Incluye `slug` como dependencia para asegurarte de que se ejecute cuando cambie

  if (!currentObject) {
    // Muestra un mensaje de carga o un spinner mientras se obtiene el objeto
    return;
  }

  const { url, explanation, title } = currentObject;

  const popUp = () =>
    Swal.fire({
      imageUrl: url,
      imageAlt: title,
      height: "h-5/6",
      width: "auto",
      showConfirmButton: false,
      showCloseButton: true,
      backdrop: `
    rgba(12, 13, 13, 0.807) 
  `,
      customClass: {
        popup: "p-0 ",
        closeButton: "text-gray-700  hover:text-gray-500 ",
        image: "p-0 m-0 ",
      },
    });

  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-extralight text-center pt-10">
        {title}
      </h1>

      <div className="flex flex-col-reverse  items-center justify-center mt-5 p-5">
        <p className="text-center mt-5 md:m-10 max-w-screen-md">
          {explanation}
        </p>
        <div className="flex justify-center md:max-w-xl">
          <InnerImageZoom
            src={url}
            zoomSrc={url}
            zoomScale={1} // Ajusta el nivel de zoom
            zoomType="click" // Puede ser hover o click según prefieras
            moveType="drag"
            hideCloseButton={false}
          />
        </div>
      </div>
    </div>
  );
}

export default Details;
