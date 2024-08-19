const MainComponent = ({title, text1, text2}) => {
  return (
    <div className="max-w-screen-md m-auto">
      <h1 className="text-4xl md:text-5xl font-extralight text-center pt-10">
        {title.toUpperCase()}
      </h1>
      <p className="text-gray-500 font-light text-md sm:text-xl  p-5 text-center ">
        {text1}
      </p>
      <p className="text-gray-500 text-md sm:text-xl font-light pb-5 p-10 pt-0 text-center ">
        {text2}
      </p>
    </div>
  );
};

export default MainComponent;
