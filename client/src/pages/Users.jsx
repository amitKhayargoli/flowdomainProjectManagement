import React, { useEffect, useState } from "react";
import { api } from "../api";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { dataGridSxStyles } from "../../lib/utils/utils";
import { isDarkMode } from "../redux/globalSlice";
import { useSelector } from "react-redux";

const Users = () => {
  const darkMode = useSelector(isDarkMode);

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer className="toolbar flex gap-2">
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  const [userData, setUserData] = useState([]);

  const columns = [
    { field: "id", headerName: "User ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "ProfilePicture", headerName: "Profile Picture", width: 150 },
  ];

  useEffect(() => {
    const getUserData = async () => {
      const response = await api.getUsersbyTeam();
      const user = response.data;
      const rows = user.map((user) => ({
        id: user.userId,
        name: user.username,
        email: user.email,
      }));

      setUserData(rows);
    };

    getUserData();
  }, []);

  console.log("userData", userData);

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
          slots={{
            toolbar: CustomToolbar,
          }}
          columns={columns}
          rows={userData || []}
          sx={dataGridSxStyles(darkMode)}
        />
      </Box>
    </div>
  );
};

export default Users;
