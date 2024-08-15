import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar/Navbar";
import "tailwindcss";
export default function Home() {
  const categories = [
    { category: "APOD", subText: "Astronomy Picture Of the Day" },
    { category: "ASTEROIDS", subText: "Asteroids information" },
    { category: "EPIC", subText: "Earth Polychromatic Imaging Camera" },
    { category: "MARS ROVER", subText: "Mars Rover Photos" },
    { category: "PODCAST", subText: "Houston we had a Podcast!" },
  ];

  return (
    <main>
      <Navbar />
      <div className="">
      <h1 className="text-4xl md:text-5xl font-extralight text-center pt-10">NASA API'S</h1>
      <p className="text-gray-700 font-light text-md sm:text-xl  p-10 pb-5 text-center ">
      On this page you will find public information provided by NASA API'S related to their work.
      </p>
      <p className="text-gray-500 text-md sm:text-xl font-light pb-5 p-10 pt-0 text-center ">
      Choose the information about what you want to consult!      </p>
        <div className="grid  p-4 grid-cols-2 grid-rows-3 md:grid-rows-3  lg:grid-rows-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
          {categories.map((item, index) => {
            return (
              <div
                key={index}
                className="border     hover:bg-gray-100 h-32 md:h-60 flex-column content-center rounded  cursor-pointer"
              >
                <div className="text-xl font-medium text-black text-center">
                  {item.category}
                </div>
                <p className="text-gray-500 text-center">{item.subText}</p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

{
  /* <div className="h-50 w-25">
            <img
              className="h-20 w-12"
              src="/img/logo.svg"
              alt="ChitChat Logo"
            />
          </div> */
}
