import React, { useState, useEffect } from "react";
import axios from "axios"; // Use axios for HTTP requests
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/globalSlice"; // Adjust the import path as necessary
import {
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home as HomeIcon,
  Layers as Layers3Icon,
  Lock as LockIcon,
  LucideAppWindowMac,
  LucideChartPie,
  LucideFileMinus,
  LucideWebhook,
  LucideWorkflow,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // Use react-router-dom for navigation

const Sidebar = () => {
  const [projects, setProjects] = useState([]);
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/init",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCurrentUser(response.data.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  console.log("Current User", currentUser);

  const dispatch = useDispatch();
  const isSidebarCollapsed = useSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const fetchProjects = async () => {
    const token = localStorage.getItem("token"); // Get the token from localStorage

    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/projects", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      setProjects(response.data); // Set the fetched projects data
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // console.log(projects);
  console.log("Projects fetched", projects);

  const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white 
  ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}
  `;

  return (
    <div className={sidebarClassNames}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-2xl font-bold text-[#00a6ff] dark:text-white">
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

        {/* {TEAM} */}

        <div className="flex items-center gap-3 border-y-[1.5px] border-gray-200 px-6 py-2 rounded-md  dark:border-0 ">
          <img
            className="max-h-12 object-cover"
            // src="https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png"
            // src="https://img.freepik.com/premium-vector/cute-cartoon-boy-vector-illustration-isolated-white-background_1151-83652.jpg"
            alt="Logo"
            src="https://preview.redd.it/no-spoilers-new-season-2-image-without-text-fan-edit-v0-t0u718ort64d1.png?width=640&crop=smart&auto=webp&s=362f814491baee7c942af01213f41c9b05ffb2e1"
            width={40}
            height={60}
            style={{ borderRadius: "50%" }}
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
          <SidebarLink icon={HomeIcon} label="Projects" href="projects" />
          {/* <SidebarLink icon={Briefcase} label="Timeline" href="timeline" /> */}
          {/* <SidebarLink icon={Search} label="Search" href="search" />   */}

          {/* <SidebarLink icon={Settings} label="Settings" href="settings" /> */}
          <SidebarLink icon={User} label="Users" href="users" />
          <SidebarLink icon={Users} label="Teams" href="teams" />
        </nav>

        {/* Projects Links */}

        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Projects</span>
          {showProjects ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>

        {showProjects &&
          projects?.map((project) => (
            <SidebarLink
              key={project.id}
              icon={Briefcase}
              label={project.name}
              href={`projects/${project.id}`}
            />
          ))}

        {/* Priorities Links */}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Priority</span>
          {showPriority ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>

        {showPriority && (
          <>
            <SidebarLink icon={ShieldAlert} label="High" href="priority/high" />
            <SidebarLink
              icon={AlertTriangle}
              label="Medium"
              href="priority/medium"
            />
            <SidebarLink icon={AlertOctagon} label="Low" href="priority/low" />
            <SidebarLink
              icon={Layers3Icon}
              label="Backlog"
              href="priority/backlog"
            />
          </>
        )}
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
        className={`rounded-md dark:bg-black-300 relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:hover:bg-black ${
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

export default Sidebar;
