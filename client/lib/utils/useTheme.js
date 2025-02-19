// src/hooks/useTheme.js
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setDarkMode,
  toggleDarkMode,
  isDarkMode,
} from "../../src/redux/globalSlice";

const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector(isDarkMode) ? "dark" : "light";

  useEffect(() => {
    const darkModeFromStorage = localStorage.getItem("isDarkMode") === "true";
    dispatch(setDarkMode(darkModeFromStorage));
  }, [dispatch]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("isDarkMode", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  return [theme, toggleTheme];
};

export default useTheme;
