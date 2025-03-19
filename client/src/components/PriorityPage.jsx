import React, { useEffect, useState } from "react";
import { api } from "../api";
import ListViewCard from "./ListViewCard";
import { Box } from "@mui/material"; // Make sure this is imported
import { DataGrid } from "@mui/x-data-grid";
import { isDarkMode } from "../redux/globalSlice";
import { dataGridSxStyles } from "../../lib/utils/utils";
import { useSelector } from "react-redux";
import { format } from "date-fns"; // Ensure date-fns is installed and imported
import axios from "axios";

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

const PriorityPage = ({ priority }) => {
  const API_BASE_URL = "http://localhost:5000";

  const darkMode = useSelector(isDarkMode);
  const [view, setView] = useState("list");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token"); // Or wherever you store the token
    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/tasks/getUserTasks/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching user's tasks:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {}, [tasks]);

  const filteredTasks = tasks.filter((task) => task.priority === priority);

  if (!filteredTasks)
    return <div className="text-black">Loading or no tasks found...</div>;

  return (
    <div className="m-5 px-4">
      <h1 className="text-2xl text-black dark:text-white font-bold my-2">
        Priority Page
      </h1>
      <div className="mb-4 flex justify-start">
        <button
          className={`px-4 py-2 ${
            view === "list" ? "bg-gray-300 dark:bg-gray-600" : "bg-white "
          } rounded-l`}
          onClick={() => setView("list")}
        >
          List
        </button>
        <button
          className={`px-4 py-2 ${
            view === "table" ? "bg-gray-300 dark:bg-gray-600" : "bg-white"
          } rounded-l`}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>
      {view === "list" ? (
        <div className="grid grid-cols-1 md:grid-cols-2   gap-4">
          {filteredTasks?.map((task) => (
            <ListViewCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        view === "table" &&
        filteredTasks && (
          <Box
            sx={{
              width: "100%",
              bgcolor: darkMode ? "black" : "white",
            }}
          >
            <DataGrid
              className="border border-gray-200 dark:!border-black dark:!bg-[#1d1f21] dark:!text-white shadow"
              columns={columns}
              rows={filteredTasks}
              sx={dataGridSxStyles(darkMode)}
            />
          </Box>
        )
      )}
    </div>
  );
};

export default PriorityPage;
