import {
  Clock,
  Filter,
  Grid3X3,
  List,
  LucidePlus,
  Share2,
  Table,
} from "lucide-react";
import React, { useState } from "react";
import ModalNewProject from "./Modals/ModalNewProject";
import Header from "../../components/Header";

const ProjectHeader = ({ activeTab, setActiveTab }) => {
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

  return (
    <div className="px-4 xl:px-6 w-full">
      {/*Model New Project */}

      <ModalNewProject
        isOpen={isNewProjectOpen}
        onClose={() => setIsNewProjectOpen(false)}
      />

      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
        <Header
          name="Domain Expansion"
          buttonComponent={
            <button
              className="flex items-center rounded-md bg-blue-500 px-3 py-3 dark:bg-white dark:text-black dark:hover:text-white dark:hover:bg-black border-white dark:border-black border-hidden border-1 dark:hover:border-gray-600 text-white hover:bg-blue-600 
              transition-transform duration-500 transform hover:scale-115 cursor-pointer ease-in-out "
              onClick={() => setIsNewProjectOpen(true)}
            >
              <LucidePlus className="mr-2 h-5 w-5" /> New Project
            </button>
          }
        />
      </div>

      {/* TABS */}
      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-gray-900 md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            icon={<Grid3X3 className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          ></TabButton>

          <TabButton
            name="List"
            icon={<List className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          ></TabButton>

          <TabButton
            name="Table"
            icon={<Table className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          ></TabButton>
        </div>

        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-600 dark:text-white dark:hover:text-gray-400">
            <Filter className="h-5 w-5"></Filter>
          </button>

          <button className="text-gray-500 hover:text-gray-600 dark:text-white dark:hover:text-gray-400">
            <Share2 className="h-5 w-5"></Share2>
          </button>

          <div className="relative">
            <input
              type="text"
              placeholder="Search Tasks"
              className="rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:border-white dark:text-white"
            />
            <Grid3X3 className="absolute left-3 top-2 h-4 w-4 text-gray-400 dark:text-white"></Grid3X3>
          </div>
        </div>
      </div>
    </div>
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
