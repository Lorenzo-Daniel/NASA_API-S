const MainComponent = ({title, text1, text2}) => {
  return (
    <div className=" max-w-sm md:max-w-xl  lg:max-w-4xl m-auto px-2">
      <h1 className="text-4xl md:text-4xl font-extralight text-center m-5">
        {title.toUpperCase()}
      </h1>
      <p className="text-gray-500 font-light text-md sm:text-xl   text-center ">
        {text1}
      </p>
      <p className={`${text2  ?  "text-gray-500 text-md sm:text-xl font-light pb-5  pt-0 text-center "  :"display-none"} `}>
        {text2}
      </p>
    </div>
  );
};

export default MainComponent;
