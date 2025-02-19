import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

import Header from "../components/Header";

import { api } from "../api";

import { useDispatch, useSelector } from "react-redux";

import { dataGridSxStyles } from "../../lib/utils/utils";

import { isDarkMode } from "../redux/globalSlice";

const columns = [
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 250,
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,

    renderCell: (params) => (
      <span className="rounded-2xl bg-green-300 p-3 text-gray-800 xl:p-2">
        {params.value}
      </span>
    ),
  },

  {
    field: "priority",
    headerName: "Priority",
    width: 120,

    renderCell: (params) =>
      params.value == "High" ? (
        <span className="p-3 text-red-400 xl:p-2">{params.value}</span>
      ) : params.value == "Medium" ? (
        <span className="p-3 text-yellow-500 xl:p-2">{params.value}</span>
      ) : params.value == "Low" ? (
        <span className="p-3 text-green-400 xl:p-2">{params.value}</span>
      ) : (
        ""
      ),
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 130,
  },
  {
    field: "author",
    headerName: "Author",
    width: 100,
    renderCell: (params) =>
      (params.value && params.value.username) || "Username",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 100,
    renderCell: (params) =>
      (params.value && params.value.username) || "Unassigned",
  },
];

const TableView = ({ id, setIsNewTaskOpen }) => {
  const darkMode = useSelector(isDarkMode);
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

  return (
    <div className="w-full px-4 py-5 xl:px-6">
      <div className="pt-5">
        <Header
          name="TableView"
          buttonComponent={
            <button
              className="flex items-center rounded-sm bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 dark:bg-white dark:text-black dark:hover:text-white dark:hover:bg-black dark:hover:border-1 dark:hover:border-gray-600 cursor-pointer transition duration-300 ease-in"
              onClick={() => setIsNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>

      <DataGrid
        // className="border-3 border-gray-200 bg-white shadow-xl dark:!border-gray-800 dark:text-gray-200"
        className="border border-gray-200  dark:!border-black dark:!bg-[#1d1f21] dark:!text-white shadow"
        columns={columns}
        rows={tasks || []}
        sx={dataGridSxStyles(darkMode)}
      />
    </div>
  );
};

export default TableView;
