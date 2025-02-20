import React from "react";
import { motion } from "framer-motion";
import HomeNav from "../components/HomeNav";
import { BellDotIcon, Circle, Search, Settings } from "lucide-react";
import pfp3 from "../images/pfp3.jpg";
import "./Hero.css";
import HomeSidebar from "../components/HomeSidebar";
import TabsHeroSection from "./TabsHeroSection";
import HeroBoardView from "./HeroBoardView";

const Hero = () => {
  return (
    <div className="bg-black min-h-screen">
      <HomeNav />

      <div className="flex flex-col items-center mt-20 gap-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-semibold text-white">
            The best platform for
          </h1>
          <h2 className="text-4xl md:text-7xl font-semibold text-[#00A6FF]">
            Project Management.
          </h2>
        </div>
        <h3 className="text-[#5F5F69] text-xl font-bold w-[50%] text-center">
          Boost team productivity streamline collaboration, stay aligned, and
          achieve your goals effortlessly with Flow Domain.
        </h3>
        {/* <button className="bg-[#00A6FF] p-4 text-xl font-bold rounded-4xl mt-5 cursor-pointer">
          See how it works
        </button> */}
      </div>

      {/* browsercontainer */}

      <motion.div
        className="flex p-5 sm:p-3 justify-between items-center mb-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, amount: 0.7 }}
      >
        <div className="px-2 xl:px-50 min-h-screen mt-15">
          <div className="rounded-xl border-gray-800 border-2">
            <div className="px-5 w-full flex md:flex-row-reverse justify-between h-[50px] border-b-2 border-gray-800 items-center py-6">
              <div className="hidden md:flex gap-3 flex-row-reverse">
                <Circle
                  width={18}
                  className="text-red-600"
                  fill="currentColor"
                />
                <Circle
                  width={18}
                  className="text-yellow-500"
                  fill="currentColor"
                />
                <Circle
                  width={18}
                  className="text-green-600"
                  fill="currentColor"
                />
              </div>

              <div className="flex items-center bg-gray-800 px-2 sm:px-15 py-2 rounded-md mx-auto">
                <h1 className="text-white">
                  https://www.flowdomain.com/workspace
                </h1>
              </div>
            </div>

            <div className="xl:h-[600px] flex md:w-full">
              <HomeSidebar />
              <div className="flex flex-1 text-white flex-col custom-gradient sm:p-8">
                <div className="flex items-center mb-5">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex gap-5 items-center">
                      <h1 className="md:text-2xl md:font-semibold">
                        Workspace
                      </h1>
                      <h2 className="md:text-lg">Tasks</h2>
                      <h2 className="md:text-lg">Projects</h2>
                      <h2 className="md:text-lg">Team</h2>
                      <h2 className="md:text-lg">Invite</h2>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="hidden sm:flex gap-3">
                        <Settings />
                        <BellDotIcon />
                      </div>
                      <img
                        className="w-12 h-full rounded-full"
                        src={pfp3}
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <motion.div
                  className="flex p-5 sm:p-3 justify-between items-center mb-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold">
                      Web Development
                    </h1>
                    <h2 className="text-lg">Bring Your ideas to life</h2>
                  </div>

                  <div>
                    <button className="sm:text-xl bg-blue-700 p-3 rounded-md">
                      Start a project
                    </button>
                  </div>
                </motion.div>

                <TabsHeroSection />

                <div className="text-black">
                  <HeroBoardView />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
