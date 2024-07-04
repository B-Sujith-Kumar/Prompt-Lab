import React from 'react'
import BeatLoader from "react-spinners/BeatLoader";

const Loading = () => {
  return (
    <div className="flex justify-center items-start h-screen">
        <h1 className="font-montserrat text-2xl pt-24 text-center text-white">
            <BeatLoader color={"#fff"} loading={true} size={15}  />
            <p className='mt-4 text-center text-white text-lg tracking-wider'>Loading...</p>
        </h1>
    </div>
  )
}

export default Loading
