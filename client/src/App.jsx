import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import DashboardLayout from "./components/Workspace";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/projects/Home";
import Login from "./pages/user/Login";
import Hero from "./pages/Hero";
import Signup from "./pages/user/Signup";
import Projects from "./pages/Projects";

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Hero />} />

          <Route element={<ProtectedRoute roleRequired={"user"} />}>
            <Route path="/workspace" element={<DashboardLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<Project />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
