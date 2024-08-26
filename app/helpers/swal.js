import Swal from "sweetalert2";

export const swal = (message) => {
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
}