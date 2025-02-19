import React from "react";
import HomeNav from "../components/HomeNav";
import { Circle, Search } from "lucide-react";

import "./Hero.css";
const Hero = () => {
  return (
    <div className="bg-black min-h-screen">
      <HomeNav></HomeNav>

      <div className="flex flex-col items-center mt-20 gap-6">
        <div className="text-center">
          <h1 className="text-6xl font-semibold text-white">
            The best platform for{" "}
          </h1>
          <h2 className="text-7xl font-semibold text-[#00A6FF]">
            Project Management.
          </h2>
        </div>
        <h3 className="text-[#5F5F69] text-2xl font-bold w-[50%] text-center">
          Boost team productivity streamline collaboration, stay aligned, and
          achieve your goals effortlessly with Flow Domain.
        </h3>
        <button className="bg-[#00A6FF] p-4 text-xl font-bold rounded-4xl mt-5 cursor-pointer">
          See how it works
        </button>
      </div>

      {/* browsercontainer */}

      {/* <div className="color relative left-90 bottom-30 "></div> */}

      <div className="px-50 min-h-screen mt-15 ">
        <div className="rounded-xl border-gray-800 border-2">
          <div className="px-5 w-full flex flex-row-reverse justify-between h-[50px] border-b-2 border-gray-800  items-center py-6">
            <div className="flex gap-3 flex-row-reverse">
              <Circle
                width={18}
                className="text-red-600 "
                fill="currentColor"
              ></Circle>
              <Circle
                width={18}
                className="text-yellow-500"
                fill="currentColor"
              ></Circle>
              <Circle
                width={18}
                className="text-green-600"
                fill="currentColor"
              ></Circle>
            </div>

            <div className="flex absolute left-[40%] items-center bg-gray-800 px-20 py-2 rounded-md">
              {/* <Search className="text-white"></Search> */}
              <h1 className="text-white">https://www.flowdomain.com</h1>
            </div>
          </div>

          <div className="h-[600px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eius
            fugit distinctio nesciunt sequi repellat in mollitia blanditiis
            iste? Nihil maiores excepturi voluptates sed ea consequatur
            doloremque vitae blanditiis maxime.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
