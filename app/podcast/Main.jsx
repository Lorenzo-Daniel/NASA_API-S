import React from 'react'
import AudioComponent from '../components/AudioComponent'


function Main({data,isLoading,audioLinks}) {
  return (
    <div className="flex justify-center mt-10">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-2">
      {!isLoading
        ? data.map((item, i) => (
            <div key={i}>
              <AudioComponent
                data={item}
                audioLink={audioLinks[i]}
                showButton={true}
              />
            </div>
          ))
        : Array.from({ length: 20 }, (_, i) => i).map((_, i) => (
            <div
              key={i}
              className="flex flex-col border rounded border-slate-300 p-2 w-80 xl:w-80 animate__animated animate__fadeIn animate__infinite animate__slow"
            >
              <span className="mb-1 h-3 bg-gray-300 w-40" />
              <div className="bg-gray-200   flex  items-center justify-center  h-32 md:h-28">
                <span className="w-32 sm:w-44 p-5 bg-zinc-300 mx-5" />
              </div>
              <div className="flex justify-between items-center">
                <span className="mt-1 sm:px-3 w-14 h-3   px-1 sm:py-1 bg-gray-300 " />
                <span className="mt-1 sm:px-3 w-10 h-3  px-1 sm:py-1 bg-gray-300" />
              </div>
            </div>
          ))}
    </div>
  </div>
  )
}

export default Main
