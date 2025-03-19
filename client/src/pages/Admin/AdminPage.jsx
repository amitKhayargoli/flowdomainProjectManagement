import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "@fontsource/inter/400.css";

import "../../index.css";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import AdminSidebar from "./AdminSidebar";

const AdminPage = () => {
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

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <AdminSidebar />
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

export default AdminPage;
