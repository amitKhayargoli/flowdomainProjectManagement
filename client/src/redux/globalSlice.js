// src/redux/globalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    isSidebarCollapsed: false,
    isDarkMode: false,
    filteredTasks: [],
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
    setFilteredTasks: (state, action) => {
      state.filteredTasks = action.payload;
    },
  },
});

export const isDarkMode = (state) => state.global.isDarkMode;
export const getFilteredTasks = (state) => state.global.filteredTasks;

export const { toggleSidebar, toggleDarkMode, setDarkMode, setFilteredTasks } =
  globalSlice.actions;

export default globalSlice.reducer;
