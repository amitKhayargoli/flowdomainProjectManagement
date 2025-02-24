import React from "react";
import Navbar from "../components/Navbar";
import HomeNav from "../components/HomeNav";
import invite from "../images/invite.png";
const Invite = () => {
  return (
    <>
      <HomeNav />
      <div className="bg-black w-full h-screen px-20 flex flex-col items-center">
        <h1 className="text-6xl font-bold text-white text-center mt-8 mb-8">
          Invitation
        </h1>

        <img className="rounded-md h-[600px]" src={invite} alt="" />
      </div>
    </>
  );
};

export default Invite;
