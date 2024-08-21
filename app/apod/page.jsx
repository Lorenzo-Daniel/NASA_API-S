import Link from "next/link";
import {dataApod} from './data'
import MainComponent from "../components/MainComponent";
function apod() {
  const categories = [
    { category: "Single Date", url: "apod/singleDate" },
    { category: "Range Date", url: "apod/rangeDate" },
  ];
  return (
    <main>
      <div className="container m-auto ">
      <MainComponent title={dataApod.mainComponent?.title} text1={dataApod.mainComponent.text1} text2={dataApod.mainComponent.text2}/>

        {/* <div className="max-w-screen-md m-auto">
          <h1 className="text-4xl md:text-5xl font-extralight text-center pt-10">
            APOD
          </h1>
          <p className="text-gray-500 font-light text-md sm:text-xl p-5 pb-0 text-center ">
            Every day NASA publishes a new image or video.
          </p>
          <p className="text-gray-500 font-light text-md sm:text-xl text-center ">
            Astronomy Picture Of the Day API gives us the possibility to consult
            your images by selecting a specific date, a range of dates or
            choosing a number of random images
          </p>
          <p className="text-gray-500 text-md sm:text-xl font-light p-5  text-center ">
            Choose the information about what you want to consult!
          </p>
        </div> */}

        <div className=" flex justify-center gap-4 p-4 ">
          {categories.map((item, index) => {
            return (
              <Link
                href={item.url}
                key={index}
                style={{ width: "500px" }}
                className="border hover:bg-gray-100   h-32 lg:h-60 flex-column content-center rounded  cursor-pointer"
              >
                <p className="text-xl text-black text-center ">
                  {item.category}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default apod;
