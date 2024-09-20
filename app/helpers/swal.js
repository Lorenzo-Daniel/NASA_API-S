import Swal from "sweetalert2";

export const swalError = (message) => {
  Swal.fire({
    title: message,
    showConfirmButton: false,
    showCloseButton: true,
    customClass: {
      popup: "h-60",
      title: "font-extralight ",
      closeButton: "hover:text-gray-500",
    },
  });
};

export const swalFullImg = (url, setFullImg) => {
  Swal.fire({
    imageUrl: url,
    showCloseButton: true,
    showConfirmButton: false,
    imageAlt: "A tall image",
    showClass: {
      popup: "", // Elimina la clase de animación para la aparición
    },
    willClose: () => {
      setFullImg(false);
    },
    imageAlt: "A tall image",
    customClass: {
      container: " p-0 ",
      popup: "w-dvw bg-[#000000f9] min-h-dvh rounded-none ",
      closeButton: "hover:text-gray-200",
      image: "p-1 xl:max-w-5xl max-h-dvh",
      htmlContainer: "bg-black",
    },
  });
};

