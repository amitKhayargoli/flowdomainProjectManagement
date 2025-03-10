import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ModalNewProject from "./projects/Modals/ModalNewProject";

import { LucidePlus, Search } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModalEditProject from "./projects/Modals/ModalEditProject";

const Projects = () => {
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [projectId, setProjectId] = useState(null);

  const navigate = useNavigate();

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
      setUserRole(responseUser.data.data.role);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchProjects = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }

    try {
      const url =
        userRole === "admin"
          ? "http://localhost:5000/projects/all"
          : "http://localhost:5000/projects";

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProjects(response.data.projects || response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    console.log(userRole);
    if (userRole) {
      fetchProjects();
    }
  }, [userRole]);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const bgstyles = "bg-[#f9f9f9] dark:bg-[#0d0d0d]";
  return (
    <>
      <ModalNewProject
        isOpen={isNewProjectOpen}
        onClose={() => setIsNewProjectOpen(false)}
      />
      <ModalEditProject
        id={projectId}
        projects={projects}
        fetchProjects={fetchProjects}
        isOpen={isEditProjectOpen}
        onClose={() => setIsEditProjectOpen(false)}
      ></ModalEditProject>

      <div className={`mx-5 p-8 rounded-xl  mt-0 flex flex-col ${bgstyles}`}>
        <div className="mb-6 flex w-full h-6 items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold dark:text-white`}>Projects</h1>
            <h2 className="md:text-lg dark:text-white">
              {userRole === "admin"
                ? "All projects in the system"
                : "Your projects"}
            </h2>
          </div>

          <div>
            <button
              className="flex items-center rounded-md bg-blue-500 px-3 py-3 dark:bg-white dark:text-black dark:hover:text-white dark:hover:bg-black border-white dark:border-black border-1 dark:hover:border-gray-600 text-white hover:bg-blue-600 transition-transform duration-500 transform hover:scale-115 cursor-pointer ease-in-out"
              onClick={() => setIsNewProjectOpen(true)}
            >
              <LucidePlus className=" h-5 w-5" /> New Project
            </button>
          </div>
        </div>

        <div className="mb-8 mt-4">
          <div className="flex items-center gap-2 dark:text-white border-1 dark:border-gray-600 border-gray-300 rounded-md focus:outline-none p-2">
            <Search width={20} className="" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none w-full dark:text-white placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid xl:grid-cols-3 gap-8">
          {filteredProjects.length === 0 ? (
            <div className="text-xl dark:text-white">No projects found</div>
          ) : (
            filteredProjects.map((project) => (
              <div
                onClick={() => {
                  {
                    if (userRole !== "admin") {
                      navigate(`${project.id}`);
                    } else {
                      //new modal to edit project
                      setProjectId(project.id);
                      setIsEditProjectOpen(true);
                    }
                  }
                }}
                className="rounded-xl overflow-hidden h-[300px] hover:opacity-96 dark:hover:opacity-60 cursor-pointer transition duration-200 ease-out"
                key={project.id}
              >
                <div className="relative h-full">
                  <img
                    className="w-full h-full object-cover"
                    src={project.coverURL}
                    alt="Project Cover"
                  />
                  <div className="absolute inset-0 bg-black/60"></div>

                  <div className="h-20 w-full absolute bottom-0 p-6 bg-black/60">
                    <h1 className="dark:text-white text-xl text-white font-bold">
                      {project.name}
                    </h1>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
