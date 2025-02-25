import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

import Header from "../components/Header";

import { api } from "../api";

import { useDispatch, useSelector } from "react-redux";

import { dataGridSxStyles } from "../../lib/utils/utils";

import { isDarkMode } from "../redux/globalSlice";
import { format } from "date-fns"; // Import date-fns for date formatting
import { Box } from "@mui/material";

const columns = [
  {
    field: "title",
    headerName: "Title",
    width: 180,
  },
  {
    field: "description",
    headerName: "Description",
    width: 300,
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
    renderCell: (params) => (
      <span className="rounded-2xl bg-blue-400 p-3 text-gray-800 xl:p-2">
        {params.value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 120,
    renderCell: (params) =>
      params.value === "High" ? (
        <span className="p-3 text-red-400 xl:p-2">{params.value}</span>
      ) : params.value === "Medium" ? (
        <span className="p-3 text-yellow-500 xl:p-2">{params.value}</span>
      ) : params.value === "Low" ? (
        <span className="p-3 text-green-400 xl:p-2">{params.value}</span>
      ) : params.value === "Backlog" ? (
        <span className="p-3 text-blue-400 xl:p-2">{params.value}</span>
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
    renderCell: (params) => {
      return params.value
        ? format(new Date(params.value), "MMM dd, yyyy")
        : "Not set";
    },
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 130,
    renderCell: (params) => {
      return params.value
        ? format(new Date(params.value), "MMM dd, yyyy")
        : "Not set";
    },
  },
];

const TableView = ({ id, setIsNewTaskOpen }) => {
  const darkMode = useSelector(isDarkMode);
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

    // Uncomment if you want to refresh the data periodically
    // const fetchData = setInterval(() => {
    //   fetchTasks();
    // }, 2000);

    // return () => clearInterval(fetchData);
  }, [fetchTasks]);

  return (
    <div className="w-full px-4 py-5 xl:px-6">
      <div className="pt-5">
        <Header
          name="TableView"
          buttonComponent={
            <button
              className="flex items-center rounded-sm bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 dark:bg-white dark:text-black dark:hover:text-white dark:hover:bg-black  transition-transform duration-500 transform hover:scale-115 cursor-pointer ease-in-out  dark:hover:border-gray-600 "
              onClick={() => setIsNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>

      <Box
        sx={{
          width: "100%",
          bgcolor: darkMode ? "black" : "white",
        }}
      >
        <DataGrid
          className="border border-gray-200 dark:!border-black dark:!bg-[#1d1f21] dark:!text-white shadow"
          columns={columns}
          rows={tasks || []}
          sx={dataGridSxStyles(darkMode)}
        />
      </Box>
    </div>
  );
};

export default TableView;
