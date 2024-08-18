"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";

 function Details() {
  const { slug } = useParams(); // Captura el slug de la URL
  const getSS = JSON.parse(sessionStorage.getItem("NASA-pictures")) || [];
  const [currentObject, setCurrentObject] = useState({});
console.log(currentObject);

   const popUp = () => 
    Swal.fire({
    imageUrl: currentObject.url,
    imageAlt: "A tall image",
    height : 'auto',
    width:'auto',
showConfirmButton:false,
    showCloseButton: true,
    backdrop: `
    rgba(12, 13, 13, 0.807) 
  `,
customClass: {
  container: 'p-0 m-0 bg-black ',
  popup: 'p-0 bg-gray-300',
  header: '...',
  title: '...',
  backdrop:'bg-black',
  closeButton: 'text-gray-700 active:outline-none  hover:text-gray-500',
  icon: '...',
  image: 'p-0 m-0 ',
  htmlContainer: 'bg-red-500',
  input: '...',
  inputLabel: '...',
  validationMessage: '...',
  actions: '...',
  confirmButton: '...',
  denyButton: '...',
  cancelButton: '...',
  loader: '...',
  footer: 'p-0 m-0 ',
  timerProgressBar: '....',
}


  });

  const findObject = () => {
    const title = decodeURIComponent(slug);
    const find = getSS.find((element) => element.title === title);
    console.log(title);

    setCurrentObject(find);
  };
  useEffect(() => {
    findObject();
  }, []);
  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-extralight text-center pt-10">
        {currentObject?.title}
      </h1>

      <div className=" flex flex-col-reverse xl:flex-row items-center justify-center mt-5 p-5 ">
        <p className="text-center mt-5 md:m-10 max-w-screen-md">
          {currentObject?.explanation}
        </p>
        <div className="  overflow-hidden object-container">
          <img
            onClick={()=>popUp()}
            className="lg:max-w-screen-md xl:max-w-screen-md xl-h-80 lg:h-96"
            src={currentObject?.url}
            alt={currentObject?.title}
          />
        </div>
      </div>
    </div>
  );
}

export default Details