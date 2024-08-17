
import Link from "next/link";
function Apod() {
  const categories = [{ category: "Single Date" ,url:'singleDate'}, { category: "Range Date",url:'rangeDate' }];
  return (
    <main>
      <h1 className="text-4xl md:text-5xl font-extralight text-center pt-10">
        APOD
      </h1>
      <p className="text-gray-700 font-light text-md sm:text-xl  p-10 pb-5 text-center ">
        With this API you can choose the Astronomy Picture Of the Day or select
        a range of dates and display a gallery
      </p>
      <p className="text-gray-500 text-md sm:text-xl font-light pb-5 p-10 pt-0 text-center ">
        Choose the information about what you want to consult!
      </p>
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
    </main>
  );
}

export default Apod;
