import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/globalSlice"; // Adjust the import path as necessary
import {
  Home as HomeIcon,
  Layers as Layers3Icon,
  Lock as LockIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // Use react-router-dom for navigation

const AdminSidebar = () => {
  const [projects, setProjects] = useState([]);

  const dispatch = useDispatch();
  const isSidebarCollapsed = useSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white 
  ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}
  `;

  return (
    <div className={sidebarClassNames}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-2xl font-bold text-[#00A6FF] dark:text-white">
            <h1>Flow Domain ™</h1>
          </div>

          {isSidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() => {
                dispatch(toggleSidebar(!isSidebarCollapsed));
              }}
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 border-y-[1.5px] border-gray-200 px-6 py-2 rounded-md  dark:border-0 ">
          <img
            className="max-h-12 object-cover"
            alt="Logo"
            src="https://preview.redd.it/no-spoilers-new-season-2-image-without-text-fan-edit-v0-t0u718ort64d1.png?width=640&crop=smart&auto=webp&s=362f814491baee7c942af01213f41c9b05ffb2e1"
            width={40}
            height={60}
            style={{ borderRadius: "50%" }}
          />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-white">
              Amit Khayargoli
            </h3>

            <h3 className="text-sm font-normal tracking-wide dark:text-white">
              amit99@gmail.com
            </h3>
          </div>
        </div>

        <nav className="z-10 w-full">
          <SidebarLink icon={HomeIcon} label="Projects" href="projects" />
          {/* <SidebarLink icon={Briefcase} label="Timeline" href="timeline" /> */}
          <SidebarLink icon={Search} label="Search" href="search" />

          <SidebarLink icon={Settings} label="Settings" href="settings" />
          <SidebarLink icon={User} label="Users" href="users" />
          <SidebarLink icon={User} label="Blog" href="blog" />
          <SidebarLink icon={User} label="Docs" href="users" />
          <SidebarLink icon={Users} label="Changelog" href="teams" />
        </nav>
      </div>
    </div>
  );
};

const SidebarLink = ({ href, icon: Icon, label }) => {
  const location = useLocation();
  const isActive =
    location.pathname === `/workspace/${href}` ||
    (location.pathname === "/" && href === "/workspace");

  return (
    <Link to={href} className="w-full">
      <div
        className={`dark:bg-black-300 relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:hover:bg-black ${
          isActive ? "text-white dark:bg-[#1d1f21] bg-[#f3f4f6]" : ""
        } justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-500" />
        )}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default AdminSidebar;
