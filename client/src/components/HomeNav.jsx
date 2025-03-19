import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../src/images/logo.png";

const HomeNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const liClassNames = (path) =>
    `cursor-pointer transition duration-300 ease-in ${
      isActive(path) ? "text-blue-400 font-bold" : "hover:text-blue-400"
    }`;

  return (
    <div className="px-5 h-25 flex justify-between items-center bg-black">
      <img
        src={Logo}
        onClick={() => navigate("/")}
        alt="Logo"
        className="h-full"
      />

      <ul className="md:flex text-2xl font-semibold text-[#5F5F69] gap-10 hidden">
        <li
          className={liClassNames("/product")}
          onClick={() => {
            window.scrollTo({ top: 1000, behavior: "smooth" });
          }}
        >
          Product
        </li>
        <li
          className={liClassNames("/pricing")}
          onClick={() => navigate("/pricing")}
        >
          Pricing
        </li>
        <li className={liClassNames("/blog")} onClick={() => navigate("/blog")}>
          Blog
        </li>
        <li
          className={liClassNames("/changelog")}
          onClick={() => navigate("/changelog")}
        >
          Changelog
        </li>
      </ul>

      <button
        onClick={() => navigate("/login")}
        className="py-2 px-8 bg-[#0C8CE9] rounded-xl text-2xl cursor-pointer hover:text-white hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Login
      </button>
    </div>
  );
};

export default HomeNav;
