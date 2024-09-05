"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { CircleLoader } from "react-spinners";
import InnerImageZoomComponent from "@/app/components/InnerImageZoomComponent";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";


//-------------------------------------------------  


function DetailsMarsRover() {
  const { slug } = useParams();
  const getSS = JSON.parse(sessionStorage.getItem("marsRover")) || [];
  const [currentObject, setCurrentObject] = useState(null);

  useEffect(() => {
    const findObject = () => {
      const title = decodeURIComponent(slug);
      const find = getSS.find((element) => element.id == title);
      setCurrentObject(find);
    };

    findObject();
  }, [slug]);

  if (!currentObject) {
    return (
      <div className="flex justify-center mt-5">
        <CircleLoader color={"#d4d6da"} size={50} />
      </div>
    );
  }

  const { img_src, earth_date, camera, rover ,id} = currentObject;
  const { landing_date, launch_date, name } = rover;
  const { full_name } = camera;

  return (
    <div className="bg-black min-h-dvh flex justify-center pt-5">
      <div className="p-5 max-w-xl ">
        <InnerImageZoomComponent url={img_src} date={launch_date} />
        <div className="text-white">
          <p className="text-green-500">{name}</p>
          <p className="text-green-500">
            Camera :<span className="text-white ms-1">{full_name}</span>
          </p>
          <p className="text-green-500">
            Date :<span className="text-white ms-1">{earth_date}</span>
          </p>
          <p className="text-green-500">
            Landing date :{" "}
            <span className="text-white ms-1">{landing_date}</span>
          </p>
          <p className="text-green-500">
            Launch date :<span className="text-white ms-1">{launch_date}</span>
          </p>
          <Link
              href={`/marsRover`}
              className="flex justify-center items-center border p-1 border-gray-300 rounded max-w-36 text-gray-500 hover:text-gray-600 hover:border-gray-500 mt-2"
            >
              <IoArrowBackOutline size={20} />
              <span className="ml-1 text-sm">back to gallery</span>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default DetailsMarsRover;
