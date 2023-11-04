import React, {useState, useEffect} from "react";
import db from "../firebase";
import {collection,doc, deleteDoc, getDocs, updateDoc, setDoc} from "firebase/firestore";
import OtpInput from 'react-otp-input';

const Home = () => {
  return (
    <>
    {/* getting started with wesmopay tailwind css*/}
    <div className="h-screen flex p-2 justify-center items-center bg-[#ffffff]"
     style={{
      backgroundImage: "url('/shape.svg')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center", 
      backgroundSize: "cover"
      
    }}
    >
      <div className="bg-transparent p-4 flex flex-col justify-between gap-y-44 rounded md:w-1/2 w-full">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-4xl text-[#3D404F] text-center font-bold mb-10">The most trusted platform for online payments</h1>
          <h2 className="text-[#3D404F] text-2xl text-center uppercase">160 countries. 100 currencies. one account</h2>
          <h2 className="text-[#3D404F] text-2xl text-center mt-7">Accept and optimise payments globally</h2>
        </div>
        <div>
            <button className="w-full py-3 bg-[#3D404F] rounded text-white hover:bg-[#35394d]"
            onClick={() => window.location.href="/account"}
            >Get Started</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home