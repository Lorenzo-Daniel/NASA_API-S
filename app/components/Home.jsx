'use client'
import React, { useEffect } from 'react'
import Link from "next/link";
import MainComponent from "../components/MainComponent";
import { data } from "../data";

function Home() {


    const categories = [
        { category: "apod", subText: "Astronomy Picture Of the Day" },
        { category: "asteroids", subText: "Asteroids information" },
        { category: "epic", subText: "Earth Polychromatic Imaging Camera" },
        { category: "marsRover", subText: "Mars Rover Photos" },
        { category: "podcast", subText: "Houston we had a Podcast!" },
      ];
      
useEffect(()=> {
sessionStorage.clear()
},[])

  return (
    <div className="container m-auto ">
    <MainComponent title={data.mainComponent?.title} text1={data.mainComponent.text1} text2={data.mainComponent.text2}/>
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
  )
}

export default Home
