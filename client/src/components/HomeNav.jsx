import React from "react";

import Logo from "../../src/images/logo.png";
import { useNavigate } from "react-router-dom";

const HomeNav = () => {
  const navigate = useNavigate();
  const liClassNames = `cursor-pointer hover:text-blue-400  transition duration-300 ease-in`;
  return (
    <div className="px-5 h-25 flex justify-between items-center bg-black">
      <img src={Logo} alt="" className="h-full" />

      <ul className="md:flex text-2xl font-semibold text-[#5F5F69]  gap-10 hidden">
        <li className={liClassNames}>Product</li>
        <li className={liClassNames}>Pricing</li>
        <li className={liClassNames}>Blog</li>
        <li className={liClassNames}>Docs</li>
        <li className={liClassNames}>Changelog</li>
      </ul>

      <button
        onClick={() => navigate("/Login")}
        className="py-2 px-8 bg-[#0C8CE9] rounded-xl text-2xl cursor-pointer hover:text-white hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Login
      </button>
    </div>
  );
};

export default HomeNav;
