"use client";

import { useEffect, useState } from "react";


function TypeWriter( {text} ) {
  const [textToShow, setTextToShow] = useState([]);
  const [wordsInterval, setWordsInterval] = useState(null);
console.log('text',text);

  const handleGenerateText = (text) => {
    const allWords = text.split(" ");
    let i = 0;
    const wordsInterval = setInterval(() => {
      if (i < allWords.length) {
        setTextToShow((prev) => [...prev, allWords[i]]);
        i++;
      } else {
        clearInterval(wordsInterval);
      }
    }, 400);
    setWordsInterval(wordsInterval);
  };

  useEffect(() => {
    if (text) {
      handleGenerateText(text);
    }
  }, [text]);

  useEffect(() => {
    return () => {
      clearInterval(wordsInterval);
    };
  }, [wordsInterval]);

  const handleReset = () => {
    clearInterval(wordsInterval);
    setTextToShow([]);
  };

  return (
    <div className="text-white">
      {/* <button className="border" onClick={handleGenerateText}>
        start
      </button> */}
      {/* <p className="text-white">{textToShow}</p> */}
    </div>
  );
}

export default TypeWriter;
