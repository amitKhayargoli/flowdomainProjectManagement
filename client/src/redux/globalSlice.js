// src/redux/globalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    isSidebarCollapsed: false,
    isDarkMode: false,
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
  },
});

export const isDarkMode = (state) => state.global.isDarkMode;

export const { toggleSidebar, toggleDarkMode, setDarkMode } =
  globalSlice.actions;
export default globalSlice.reducer;
