// src/DashboardLayout.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar, toggleDarkMode } from "../redux/globalSlice";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "@fontsource/inter/400.css";

import "../index.css";
import { Outlet } from "react-router-dom";

const Workspace = () => {
  const dispatch = useDispatch();
  const isSidebarCollapsed = useSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  console.log(isDarkMode);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <Sidebar />
      <main
        className={`flex w-full flex-col bg-gray-50 dark:bg-black ${
          isSidebarCollapsed ? "" : "md:pl-64"
        }`}
      >
        <Navbar />
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default Workspace;
