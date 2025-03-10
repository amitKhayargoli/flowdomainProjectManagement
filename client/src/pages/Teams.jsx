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
import { format } from "date-fns";

const Teams = () => {
  const darkMode = useSelector(isDarkMode);

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer className="toolbar flex gap-2">
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  const [teamsData, setTeamsData] = useState([]);
  const [sortModel, setSortModel] = useState([
    {
      field: "projectId",
      sort: "asc",
    },
  ]);

  const columns = [
    { field: "userId", headerName: "User ID", width: 100 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "projectId",
      headerName: "Project ID",
      width: 100,
      sortable: true,
    },
    { field: "projectName", headerName: "Project", width: 200 },
    {
      field: "projectDescription",
      headerName: "Project Description",
      width: 300,
    },
    { field: "startDate", headerName: "Start Date", width: 200 },
    { field: "endDate", headerName: "End Date", width: 200 },
  ];

  useEffect(() => {
    const getTeamsData = async () => {
      try {
        const response = await api.getCurrentUserProjectTeams();
        const teams = response;

        console.log("response", response);

        const rows = teams.map((team) => ({
          id: `${team.user.userId}-${team.project.id}`,
          userId: team.user.userId,
          username: team.user.username,
          email: team.user.email,
          projectId: team.project.id,
          projectName: team.project.name,
          projectDescription: team.project.description,
          startDate: team.project.startDate
            ? format(new Date(team.project.startDate), "MMM dd, yyyy") // Format startDate
            : "Not set",
          endDate: team.project.endDate
            ? format(new Date(team.project.endDate), "MMM dd, yyyy") // Format endDate
            : "Not set",
        }));

        setTeamsData(rows);
      } catch (error) {
        console.error("Error fetching team data", error);
      }
    };

    getTeamsData();
  }, []);

  console.log("Teams", teamsData);

  return (
    <div className="flex flex-col bg-white items-center !p-8 dark:bg-black">
      <h2 className="!text-3xl font-bold mb-4 dark:text-white">Teams</h2>
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
          rows={teamsData || []}
          sx={dataGridSxStyles(darkMode)}
          sortModel={sortModel}
          onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
        />
      </Box>
    </div>
  );
};

export default Teams;
