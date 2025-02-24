import { getTasks } from "../../../server/controllers/taskController";

import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import ListViewCard from "../components/ListViewCard";
import { api } from "../api";

const ListView = ({ id, setIsNewTaskOpen }) => {
  const [tasks, setTasks] = useState([]);
  const fetchTasks = useCallback(async () => {
    try {
      const data = await api.getTasks(id);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchTasks();

    // const fetchData = setInterval(() => {
    //   fetchTasks();
    // }, 2000);

    // return () => clearInterval(fetchData);
  }, [fetchTasks]);
  // console.log(tasks);

  return (
    <div className="w-full px-4 pb-8 py-5 xl:px-6">
      <div className="pt-5">
        <Header
          name="ListView"
          buttonComponent={
            <button
              className="flex items-center rounded-sm bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 dark:bg-white dark:text-black dark:hover:text-white dark:hover:bg-black  dark:hover:border-gray-600  transition-transform duration-500 transform hover:scale-115 cursor-pointer ease-in-out "
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
