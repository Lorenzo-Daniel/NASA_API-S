import { dataApod } from "./data";
import MainComponent from "../components/TextComponent";
import ButtonLink from "../components/ButtonLink";

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
    <div className="container max-w-2xl m-auto ">
      <MainComponent
        title={dataApod.mainComponent?.title}
        text1={dataApod.mainComponent.text1}
        text2={dataApod.mainComponent.text2}
      />
      <div className=" flex justify-center gap-4 p-4 ">
        {categories.map((item, index) => {
          return (
            <ButtonLink key={index} url={item.url} action={item.category} />
          );
        })}
      </div>
    </div>
  );
}

export default apod;
