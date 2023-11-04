import React from "react";

const Home = () => {
  return (
    <>
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
          <h1 className="text-4xl text-[#3D404F] text-center uppercase font-bold mb-10">one account, for all the money in the world</h1>
        </div>
        {/* login, register, sign in with paxful */}
        <div className="flex flex-col gap-y-4">
         <div className="flex gap-x-4">
            <button className="w-full py-3 bg-[#3D404F] rounded text-white hover:bg-[#35394d]"
            onClick={() => window.location.href="/login"}
            >Login</button>
            <button className="w-full py-3 bg-[#3D404F] rounded text-white hover:bg-[#35394d]"
            onClick={() => window.location.href="/register"}
            >Register</button>
            </div>
          <button className="w-full py-3 bg-purple-700 rounded text-white hover:bg-[#35394d]"
          onClick={() => window.location.href="/paxfullaccount"}
          >Sign in with Paxful</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home