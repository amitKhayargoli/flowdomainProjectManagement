import React from "react";
import { Menu, Moon, Search, Settings, Sun } from "lucide-react";
import { Link } from "react-router-dom"; // Use react-router-dom Link instead of next/link
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, toggleSidebar } from "../redux/globalSlice"; // Adjust the import path as necessary

const Navbar = () => {
  const dispatch = useDispatch();
  const isSidebarCollapsed = useSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useSelector((state) => state.global.isDarkMode);

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      {/* {search} */}
      <div className="flex items-center gap-8">
        {!isSidebarCollapsed ? null : (
          <button onClick={() => dispatch(toggleSidebar(!isSidebarCollapsed))}>
            <Menu className="h-8 w-8 dark:text-white"></Menu>
          </button>
        )}

        {/* <div className="relative flex h-min w-[200px]">
          <Search className="absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />

          <input className="darK:bg-gray-700 w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-black dark:border-2 dark:border-gray-400 dark:text-white dark:placeholder-white"></input>
        </div> */}
      </div>

      <div className="flex items-center">
        <button
          onClick={() => dispatch(toggleDarkMode(!isDarkMode))}
          className={
            isDarkMode
              ? `rounded p-2 dark:hover:bg-gray-700`
              : `rounded p-2 hover:bg-gray-100`
          }
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
          ) : (
            <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
          )}
        </button>
        <Link
          href="/settings"
          className={
            isDarkMode
              ? `h-min w-min rounded p-2 dark:hover:bg-gray-700`
              : `h-min w-min rounded p-2 hover:bg-gray-100`
          }
        >
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link>

        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
      </div>
    </div>
  );
};

export default Navbar;
