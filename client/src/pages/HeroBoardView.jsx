import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { motion } from "framer-motion";
import { HTML5Backend } from "react-dnd-html5-backend";

import { EllipsisVertical, MessageSquareQuoteIcon, Plus } from "lucide-react";
import { format } from "date-fns";

const taskStatus = ["To do", "Doing", "Review", "Completed"];

const dummyTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Api Testing",
    status: "To do",
    startDate: "2025-02-19",
    dueDate: "2025-02-21",
    priority: "High",
    tags: "",
    comments: [{ id: 1, text: "Comment 1" }],
    attachments: [],

    points: 5,
  },
  {
    id: 2,
    title: "Task 2",
    description: "Form validation",
    status: "Doing",
    startDate: "2025-02-18",
    dueDate: "2025-02-22",
    priority: "Medium",
    tags: "optional",
    comments: [{ id: 2, text: "Comment 2" }],
    attachments: [],
    points: 3,
  },
];

const HeroBoardView = ({ id, setIsNewTaskOpen }) => {
  const [tasks, setTasks] = useState(dummyTasks);

  const moveTask = (taskId, status) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <motion.div
      className="flex p-5 sm:p-3 justify-between items-center mb-5"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false, amount: 1 }}
    >
      <DndProvider backend={HTML5Backend}>
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-4">
          {taskStatus.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks}
              moveTask={moveTask}
              setIsNewTaskOpen={setIsNewTaskOpen}
            />
          ))}
        </div>
      </DndProvider>
    </motion.div>
  );
};

const TaskColumn = ({ status, tasks, moveTask, setIsNewTaskOpen }) => {
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
    Doing: "#f6c028",
    Review: "#88f68e",
    Completed: "#88e2f3",
  };

  return (
    <div
      ref={drop}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 ${
        isOver ? "bg-blue-100 dark:bg-blue-500" : ""
      }`}
    >
      <div className="mb-3 flex w-full">
        <div
          className="w-2 rounded-s-lg"
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

            <button className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:bg-gray-300 dark:hover:bg-slate-100">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {tasks
        .filter((task) => task.status?.toLowerCase() === status?.toLowerCase())
        .map((task) => (
          <Task key={task.id} task={task} />
        ))}
    </div>
  );
};

const Task = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

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
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`mb-4 rounded-md bg-white shadow dark:bg-[#1d1f21] ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <img
          src={`/${task.attachments[0].fileURL}`}
          alt={task.attachments[0].fileName}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-md"
        />
      )}

      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}

            <div className="flex gap-2">
              {taskTagsSplit.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full bg-blue-400 px-2 py-1 text-xs"
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
          {typeof task.points === "number" && (
            <div className="text-xs font-semibold dark:text-white">
              {task.points} pts
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 dark:text-neutral-500">
          {formattedStartDate && <span>{formattedStartDate} - </span>}
          {formattedDueDate && <span>{formattedDueDate}</span>}
        </div>

        <div className="text-sm text-gray-600 dark:text-neutral-500">
          {task.description}
        </div>

        <div className="mt-4 border-t border-gray-200 dark:border-gray-500"></div>
      </div>
    </div>
  );
};

export default HeroBoardView;
