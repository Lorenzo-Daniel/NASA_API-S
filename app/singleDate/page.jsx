import React from 'react'
function SingleDate() {

  //SINGLE DATE
  const getSingleDateRequest = async (date) => {
    try {
      setIsLoading({ singDate: true });
      const request = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj&date=${date}&concept_tags=True`
      );
      const response = await request.json();
      localStorage.setItem("pictures", JSON.stringify([response]));
      navigate("/apodGallery");
      setIsLoading({ singDate: false });
    } catch (error) {
      setIsLoading({ singDate: false });
      alert("Algo salio mal! Vuelve a intentarlo mas tarde");
      console.log(error);
    }
  };

  return (
    <div>
    single PAage
     </div>
  )
}

export default SingleDate
