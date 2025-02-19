import { getTasks } from "../../../server/controllers/taskController";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ListViewCard from "../components/ListViewCard";
import { api } from "../api";

const ListView = ({ id, setIsNewTaskOpen }) => {
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    try {
      const data = await api.getTasks(id);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [id]);

  console.log(tasks);

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="List"
          buttonComponent={
            <button
              className="flex items-center rounded-sm bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 dark:bg-white dark:text-black dark:hover:text-white dark:hover:bg-black dark:hover:border-1 dark:hover:border-gray-600 cursor-pointer transition duration-300 ease-in"
              onClick={() => setIsNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        ></Header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {tasks?.map((task) => (
            <ListViewCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListView;
