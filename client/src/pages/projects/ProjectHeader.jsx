import {
  Circle,
  Clock,
  Filter,
  Grid3X3,
  List,
  LucidePlus,
  Search,
  Share2,
  Table,
  X,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import ModalNewProject from "./Modals/ModalNewProject";
import Header from "../../components/Header";
import { api } from "../../api";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProjectHeader = ({ id, activeTab, setActiveTab, project }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isModalInviteOpen, setIsModalInviteOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState("");

  const parsedProjectId = Number(id);

  const generateInvite = async () => {
    try {
      const Authtoken = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/invite",
        {
          projectId: parsedProjectId,
        },
        {
          headers: {
            Authorization: `Bearer ${Authtoken}`,
          },
        }
      );

      const token = response.data.token;

      const link = `http://localhost:5173/invite?token=${token}`;

      setInviteLink(link);
    } catch (error) {
      console.error("Error generating invite:", error);
    }
  };

  const fetchTasks = useCallback(async () => {
    try {
      const data = await api.getTasks(id);
      console.log(data);
      setTasks(data);
      setFilteredTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchTasks();
    console.log("Fetched ", tasks);
  }, [fetchTasks]);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      alert("Link copied to clipboard!");
    });
  };
  return (
    <>
      <div className="px-4 xl:px-6 w-full">
        {/* Modal New Project */}
        <ModalNewProject
          isOpen={isNewProjectOpen}
          onClose={() => setIsNewProjectOpen(false)}
        />

        {/* TABS */}
        <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-gray-900 md:items-center">
          <div className="flex flex-1 items-center gap-2 md:gap-4">
            <TabButton
              name="Board"
              icon={<Grid3X3 className="h-5 w-5" />}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />
            <TabButton
              name="List"
              icon={<List className="h-5 w-5" />}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />
            <TabButton
              name="Table"
              icon={<Table className="h-5 w-5" />}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />
          </div>

          <button
            onClick={() => {
              setIsModalInviteOpen(!isModalInviteOpen);
              generateInvite();
            }}
            className="flex items-center rounded-md bg-blue-500 px-3 py-3 dark:bg-black dark:text-white dark:hover:text-white dark:hover:bg-black dark:border-gray-200 border-white border-1  text-white hover:bg-blue-600 
          transition-transform duration-500 transform hover:scale-110 cursor-pointer ease-in-out"
          >
            Invite Members
          </button>
          <button
            className="flex items-center rounded-md bg-blue-500 px-3 py-3 dark:bg-white dark:text-black dark:hover:text-white dark:hover:bg-black border-white dark:border-black border-1 dark:hover:border-gray-200 text-white hover:bg-blue-600 
          transition-transform duration-500 transform hover:scale-110 cursor-pointer ease-in-out"
            onClick={() => setIsNewProjectOpen(true)}
          >
            <LucidePlus className="mr-2 h-5 w-5" /> New Project
          </button>
        </div>
      </div>

      {isModalInviteOpen && (
        <div className="p-3 px-5 rounded-md absolute md:my-0 md:mx-0   w-full h-full   z-500 inset-0 flex items-center justify-center ">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-md z-10"></div>

          {/* Modal Contents */}

          <div className="relative z-20 w-full md:w-200 md:h-100 p-6 rounded-lg bg-black/80  dark:bg-[#080808] ">
            <div className="hidden md:flex gap-3 flex-row-reverse">
              <Circle
                onClick={() => setIsModalInviteOpen(false)}
                width={18}
                className="text-red-600"
                fill="currentColor"
              />
              <Circle
                width={18}
                className="text-yellow-500"
                fill="currentColor"
              />
              <Circle
                width={18}
                className="text-green-600"
                fill="currentColor"
              />
            </div>
            <div className="mt-8">
              <h1 className="text-xl font-bold text-center text-white">
                Invite Friends
              </h1>
              <h1 className="text-xl font-bold text-center text-blue-400">
                Send Invitation Link
              </h1>
            </div>
            <div className="gap-6 text-white bg-black/80 h-30 px-5 py-8 items-center flex justify-between mt-10 rounded-sm  ">
              <h1 className="text-[14px] break-all ">{inviteLink}</h1>
              <button
                onClick={handleCopy}
                className="bg-blue-600 my-1 px-5 p-2 text-lg hover:bg-blue-600 rounded cursor-pointer"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const TabButton = ({ name, icon, setActiveTab, activeTab }) => {
  const isActive = activeTab === name;
  const TabButtonClassNames = `relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] hover:text-blue-600 after:w-full dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4 ${
    isActive ? "text-blue-600 after:bg-blue-600 dark:text-white" : ""
  }`;

  return (
    <button
      className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600 dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4 ${
        isActive ? "text-blue-600 after:bg-blue-600 dark:text-white" : ""
      }`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};

export default ProjectHeader;
