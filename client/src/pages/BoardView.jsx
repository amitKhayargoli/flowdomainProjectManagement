import React, { useCallback, useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion } from "framer-motion";

import {
  EllipsisVertical,
  Filter,
  MessageSquareQuoteIcon,
  Plus,
  Search,
} from "lucide-react";
import { format } from "date-fns";
import {
  getTasks,
  updateTaskStatus,
} from "../../../server/controllers/taskController";
import axios from "axios";
import { api } from "../api";
import ModalEditTask from "./projects/Modals/ModalEditTask";

const taskStatus = ["To do", "Work In Progress", "Review", "Completed"];

const BoardView = ({ id, setIsNewTaskOpen }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    // }, 500);

    // return () => clearInterval(fetchData);
  }, [fetchTasks]);

  useEffect(() => {
    const filtered =
      priorityFilter === null
        ? tasks
        : tasks.filter((task) => task.priority === priorityFilter);

    setFilteredTasks(filtered);
  }, [tasks, priorityFilter]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(query)
    );
    setFilteredTasks(filtered);
  };

  const moveTask = async (taskId, status) => {
    try {
      await api.updateTaskStatus(taskId, status);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <>
      <div className="px-4 xl:px-8 mb-6 flex w-full h-6 items-center justify-between">
        <div>
          <h1 className="mt-15 text-2xl dark:text-white font-bold">
            BoardView
          </h1>
        </div>

        <div className="flex items-center gap-2 mt-15">
          {isFilterOpen && (
            <div className="relative top-25 left-20 z-100 bg-white dark:text-white dark:bg-[#1d1f21] p-2 rounded-lg shadow-md mt-2">
              <ul>
                {["High", "Medium", "Low", "Backlog"].map((priority) => (
                  <li
                    key={priority}
                    className="cursor-pointer p-1 hover:bg-gray-200 dark:hover:bg-[#2d2d2d] rounded"
                    onClick={() => {
                      setPriorityFilter(priority);
                      setIsFilterOpen(false);
                    }}
                  >
                    {priority}
                  </li>
                ))}
                <li
                  className="cursor-pointer p-1 hover:bg-gray-200 dark:hover:bg-[#2d2d2d] rounded"
                  onClick={() => setPriorityFilter(null)}
                >
                  Reset Filter
                </li>
              </ul>
            </div>
          )}
          <button
            className="text-gray-500 hover:text-gray-600 dark:text-white dark:hover:text-gray-400"
            onClick={() => setIsFilterOpen(!isFilterOpen)} // Toggle filter menu
          >
            <Filter className="h-5 w-5" />
          </button>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search Tasks"
              className="rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:border-white dark:text-white"
            />
            <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400 dark:text-white" />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 1, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
        <DndProvider backend={HTML5Backend}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 p-5 ">
            {taskStatus.map((status) => (
              <TaskColumn
                key={status}
                status={status}
                tasks={filteredTasks}
                moveTask={moveTask}
                setIsNewTaskOpen={setIsNewTaskOpen}
              />
            ))}
          </div>
        </DndProvider>
      </motion.div>
    </>
  );
};

const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsNewTaskOpen,
  fetchTasks,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const tasksCount = tasks.filter((task) => task.status === status).length;

  const statusColor = {
    "To do": "#dc2626",
    "Work In Progress": "#f6c028",
    Review: "#88f68e",
    Completed: "#88e2f3",
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 hover:cursor-pointer transition-transform duration-500 transform ${
        isOver ? "bg-blue-100 dark:bg-neutral-950" : ""
      }`}
    >
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
          style={{ backgroundColor: statusColor[status] }}
        ></div>

        <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-[#1d1f21]">
          <h3 className="flex items-center text-lg font-semibold dark:text-white">
            {status}{" "}
            <span
              className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-gray-600"
              style={{ width: "1.5rem", height: "1.5rem" }}
            >
              {tasksCount}
            </span>
          </h3>
          <div className="flex items-center gap-3">
            <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500 dark:hover:text-slate-200">
              <EllipsisVertical size={30} />
            </button>

            <button
              className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:bg-gray-300 dark:hover:bg-slate-100"
              onClick={() => setIsNewTaskOpen(true)}
            >
              <Plus size={16}></Plus>
            </button>
          </div>
        </div>
      </div>

      {tasks
        .filter((task) => task.status?.toLowerCase() === status?.toLowerCase())
        .map((task) => (
          <Task fetchTasks={fetchTasks} key={task.id} task={task} />
        ))}
    </div>
  );
};

const Task = ({ task, fetchTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskById, setTaskById] = useState(null);
  const openModal = () => {
    console.log(task.id);
    setIsModalOpen(true);
    const getTaskById = async () => {
      try {
        const response = await api.getTaskbyId(task.id);

        console.log(response);
        setTaskById(response);
      } catch (err) {
        console.error("Error fetching task by ID:", err);
      }
    };

    getTaskById();
  };
  // console.log(taskById);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const taskTagsSplit = task.tags ? task.tags.split(",") : [];

  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "";

  const numberOfComments = (task.comments && task.comments.length) || 0;

  const PriorityTag = ({ priority }) => {
    return (
      <div
        className={`full rounded-2xl px-2 py-1 text-xs font-semibold ${
          priority === "High"
            ? "bg-red-500 text-black"
            : priority === "Medium"
            ? "bg-yellow-200 text-yellow-700"
            : priority === "Low"
            ? "bg-green-200 text-green-700"
            : priority === "Backlog"
            ? "bg-gray-200 text-blue-700"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        {priority}
      </div>
    );
  };

  return (
    <>
      <ModalEditTask
        fetchTasks={fetchTasks}
        isOpen={isModalOpen}
        onClose={closeModal}
        task={taskById}
      ></ModalEditTask>

      <div
        onClick={openModal}
        ref={(instance) => {
          drag(instance);
        }}
        className={`mb-4 rounded-md bg-white shadow dark:bg-[#1d1f21] ${
          isDragging ? "opacity-50" : "opacity-100  "
        }`}
      >
        {task.fileURL ? (
          <div className="aspect-[16/9] overflow-hidden mb-4 rounded-t-lg">
            <img
              src={task.fileURL}
              alt={task.fileURL}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          ""
        )}

        <div className="p-4 md:p-6">
          <div className="flex items-start justify-between">
            <div className="flex flex-1 flex-wrap items-center gap-2">
              {task.priority && <PriorityTag priority={task.priority} />}

              <div className="flex gap-2">
                {taskTagsSplit.map((tag) => (
                  <div
                    key={tag}
                    className="rounded-full bg-blue-400 px-2 py-1 text-xs text-black"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <button className="flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500">
              <EllipsisVertical size={30} />
            </button>
          </div>

          <div className="my-5 flex justify-between px-1">
            <h4 className="text-md font-bold dark:text-white">{task.title}</h4>
          </div>

          <div className="text-xs text-gray-500 dark:text-neutral-500">
            {formattedStartDate && <span>{formattedStartDate} - </span>}
            {formattedDueDate && <span>{formattedDueDate}</span>}
          </div>

          <div className="text-sm text-gray-600 dark:text-neutral-500">
            {task.description}
          </div>

          <div className="mt-4 border-t border-gray-200 dark:border-gray-500"></div>

          {/* USERS */}

          <div className="mt-3 flex items-center justify-between">
            <div className="flex -space-x-[6px] overflow-hidden">
              {task.assignee && (
                <img
                  key={task.assignee.userId}
                  src={`/${task.assignee.profilePictureUrl}`}
                  alt={task.assignee.username}
                  width={30}
                  height={30}
                  className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-[#1d1f21]"
                />
              )}

              {task.author && (
                <img
                  key={task.author.userId}
                  src={`/${task.author.profilePictureUrl}`}
                  alt={task.author.username}
                  width={30}
                  height={30}
                  className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-[#1d1f21]"
                />
              )}
            </div>

            <div className="flex items-center text-gray-500 dark:text-white">
              <MessageSquareQuoteIcon size={20}>
                <span className="dark:text-neutral-40 ml-1 text-sm">
                  {numberOfComments}
                </span>
              </MessageSquareQuoteIcon>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardView;
