import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/globalSlice"; // Adjust the import path as necessary
import {
  Briefcase,
  Home as HomeIcon,
  Layers as Layers3Icon,
  Lock as LockIcon,
  LucideLayoutDashboard,
  MessageCircleCodeIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // Use react-router-dom for navigation
import avatar from "../../images/avatar.png";

const AdminSidebar = () => {
  const [projects, setProjects] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/auth/init", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const id = Number(response.data.data.userId);

      const responseUser = await axios.get(
        `http://localhost:5000/api/user/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(responseUser.data.data);

      setCurrentUser(responseUser.data.data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);

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
            className="object-cover rounded-full  w-15   h-15 overflow-hidden"
            alt="Logo"
            src={currentUser.profilePictureUrl || avatar}
          />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-white">
              {currentUser.username}
            </h3>

            <h3 className="text-sm font-normal tracking-wide dark:text-white">
              {currentUser.email}
            </h3>
          </div>
        </div>
        <nav className="z-10 w-full">
          <SidebarLink
            icon={LucideLayoutDashboard}
            label="Dashboard"
            href="dashboard"
          />
          <SidebarLink icon={Briefcase} label="Projects" href="Projects" />

          <SidebarLink icon={User} label="Users" href="users" />
          <SidebarLink icon={User} label="Blog" href="blog" />
          <SidebarLink
            icon={MessageCircleCodeIcon}
            label="Comments"
            href="comments"
          />
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
