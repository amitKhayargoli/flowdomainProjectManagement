import React, { useEffect, useState } from "react";
import { api } from "../api";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { dataGridSxStyles } from "../../lib/utils/utils";
import { isDarkMode } from "../redux/globalSlice";
import { useSelector } from "react-redux";
import avatar from "../images/avatar.png";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminUsers = () => {
  const darkMode = useSelector(isDarkMode);
  const [userData, setUserData] = useState([]);

  // Function to fetch user data
  const getUserData = async () => {
    try {
      const response = await api.getUsersbyTeam();
      const users = response.data;
      const rows = users.map((user) => ({
        id: user.userId,
        name: user.username,
        email: user.email,
        ProfilePicture: user.profilePictureUrl,
      }));
      setUserData(rows);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await api.deleteUser(userId);
      setUserData((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const columns = [
    { field: "id", headerName: "User ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "ProfilePicture",
      headerName: "Profile Picture",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value || avatar}
          alt="Profile"
          className="w-12 mt-2 h-12 rounded-full object-cover"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon color="error" />}
          label="Delete"
          onClick={() => handleDeleteUser(params.id)}
        />,
      ],
    },
  ];

  return (
    <div className="flex flex-col h-[100vh] bg-white items-center !p-8 dark:bg-black">
      <h2 className="!text-3xl font-bold mb-4 dark:text-white">Users</h2>
      <Box
        sx={{
          width: "100%",
          bgcolor: darkMode ? "black" : "white",
        }}
      >
        <DataGrid
          className="border border-gray-200 dark:!border-black dark:!bg-[#1d1f21] dark:!text-white shadow"
          columns={columns}
          rows={userData}
          sx={dataGridSxStyles(darkMode)}
        />
      </Box>
    </div>
  );
};

export default AdminUsers;
