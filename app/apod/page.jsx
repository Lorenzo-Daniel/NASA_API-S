import Link from "next/link";
import {dataApod} from './data'
import MainComponent from "../components/MainComponent";

export const metadata = {
  title: "NASA APIS ",
  description: "APOD",
};

function apod() {
  const categories = [
    { category: "Single Date", url: "apod/singleDate" },
    { category: "Date Range", url: "apod/rangeDate" },
  ];
  
  return (
    <main>
      <div className="container m-auto ">
      <MainComponent title={dataApod.mainComponent?.title} text1={dataApod.mainComponent.text1} text2={dataApod.mainComponent.text2}/>
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
