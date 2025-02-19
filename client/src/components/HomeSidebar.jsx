import React from "react";
import Logo from "../../src/images/logo.png";
import {
  Briefcase,
  LucideHome,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
const HomeSidebar = () => {
  return (
    <div className="md:w-22 xl:flex p-2 hidden">
      <ul className="flex flex-col gap-6 items-center">
        <li>
          <img src={Logo} alt="" />
        </li>

        <li>
          <LucideHome className="text-gray-400"></LucideHome>
        </li>
        <li>
          <Search className="text-gray-400"></Search>
        </li>

        <li>
          <Users className="text-gray-400"></Users>
        </li>

        <li>
          <User className="text-gray-400"></User>
        </li>

        <li>
          <Settings className="text-gray-400"></Settings>
        </li>

        <li>
          <Briefcase className="text-gray-400"></Briefcase>
        </li>
      </ul>
    </div>
  );
};

export default HomeSidebar;
