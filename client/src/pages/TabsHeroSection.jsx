import { Filter, Grid3X3, List, Share2, Table } from "lucide-react";
import React, { useState } from "react";

const TabsHeroSection = () => {
  const [activeTab, setActiveTab] = useState("Board");

  return (
    <div className="p-5 sm:p-2 flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-gray-900 md:items-center">
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

      <div className="flex items-center gap-2">
        <button className="text-gray-200 hover:text-gray-600  dark:hover:text-gray-300">
          <Filter className="h-5 w-5" />
        </button>
        <button className="text-gray-200 hover:text-gray-600  dark:hover:text-gray-300">
          <Share2 className="h-5 w-5" />
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Tasks"
            className="rounded-md border py-1 pl-10 pr-4 focus:outline-none  dark:text-white"
          />
          <Grid3X3 className="absolute left-3 top-2 h-4 w-4 text-gray-200 " />
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ name, icon, setActiveTab, activeTab }) => {
  const isActive = activeTab === name;
  const tabButtonClassNames = `relative flex items-center gap-2 px-1 py-2 text-gray-200 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] hover:text-blue-600 after:w-full dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4 ${
    isActive ? "text-blue-600 after:bg-blue-600 dark:text-white" : ""
  }`;

  return (
    <button className={tabButtonClassNames} onClick={() => setActiveTab(name)}>
      {icon}
      {name}
    </button>
  );
};

export default TabsHeroSection;
