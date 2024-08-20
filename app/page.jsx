import Link from "next/link";
import "tailwindcss";
import MainComponent from "./components/MainComponent";
import { data } from "./data";
export default function Home() {
  const categories = [
    { category: "apod", subText: "Astronomy Picture Of the Day" },
    { category: "asteroids", subText: "Asteroids information" },
    { category: "epic", subText: "Earth Polychromatic Imaging Camera" },
    { category: "mars rover", subText: "Mars Rover Photos" },
    { category: "podcast", subText: "Houston we had a Podcast!" },
  ];
  

  return (
    <main>
      <div className="container m-auto ">
        <MainComponent title={data.mainComponent?.title} text1={data.mainComponent.text1} text2={data.mainComponent.text2}/>
        {/* <div className="max-w-screen-md m-auto">
          <h1 className="text-4xl md:text-5xl font-extralight text-center pt-10">
            NASA APIS
          </h1>
          <p className="text-gray-500 font-light text-md sm:text-xl  p-5 text-center ">
            On this page you will find public information provided by NASA APIS
            related to their work.
          </p>
          <p className="text-gray-500 text-md sm:text-xl font-light pb-5 p-10 pt-0 text-center ">
            Choose the information about what you want to consult!{" "}
          </p>
        </div> */}
        <div className="grid p-4 grid-cols-2 grid-rows-3 md:grid-rows-3  lg:grid-rows-2 gap-4 md:grid-cols-3 ">
          {categories.map((item, index) => {
            return (
              <Link
                href={`/${item.category}`}
                key={index}
                className="border hover:bg-gray-100 h-32 md:h-60 flex-column content-center rounded  cursor-pointer"
              >
                <p className="text-xl  text-black text-center">
                  {item.category.toLocaleUpperCase()}
                </p>
                <p className="text-gray-500 text-center">{item.subText}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
