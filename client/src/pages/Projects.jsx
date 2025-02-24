import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ModalNewProject from "./projects/Modals/ModalNewProject";

import { LucidePlus, Search } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

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

      <div
        className={`mx-5 p-8 rounded-xl h-screen mt-0 flex flex-col ${bgstyles}`}
      >
        <div className="mb-6 flex w-full h-6 items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold dark:text-white`}>Projects</h1>
            <h2 className="md:text-lg dark:text-white">
              All your projects in one place
            </h2>
          </div>

          <div>
            <button
              className="flex items-center rounded-md bg-blue-500 px-3 py-3 dark:bg-white dark:text-black dark:hover:text-white dark:hover:bg-black border-white dark:border-black border-1 dark:hover:border-gray-600 text-white hover:bg-blue-600 transition-transform duration-500 transform hover:scale-115 cursor-pointer ease-in-out"
              onClick={() => setIsNewProjectOpen(true)}
            >
              <LucidePlus className="mr-2 h-5 w-5" /> New Project
            </button>
          </div>
        </div>

        <div className="mb-8 mt-4">
          <div className="flex items-center gap-2 dark:text-white border-1 dark:border-gray-600 border-gray-300 rounded-md focus:outline-none p-2">
            <Search width={20} className="" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none w-full  dark:text-white placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid xl:grid-cols-3 gap-8">
          {/* project card */}
          {filteredProjects.length === 0 ? (
            <div className="text-xl dark:text-white">No projects found</div>
          ) : (
            filteredProjects.map((project) => (
              <div
                onClick={() => navigate(`${project.id}`)}
                className="rounded-xl overflow-hidden h-[300px] hover:opacity-96 dark:hover:opacity-60 cursor-pointer transition duration-200 ease-out"
                key={project.id}
              >
                <div className="relative h-full">
                  <img
                    className="w-full h-full object-cover"
                    src={project.coverURL}
                    alt="Car Website Design"
                  />
                  {/* Black Overlay */}
                  <div className="absolute inset-0 bg-black/60"></div>

                  {/* Text Section */}
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
