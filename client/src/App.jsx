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
import Blog from "./pages/Blog";
import ProtectedRoute from "./ProtectedRoute";
import Changelog from "./pages/Changelog";
import AdminPage from "./pages/Admin/AdminPage";
import Invite from "./pages/invite";
import Users from "./pages/Users";
import Teams from "./pages/Teams";
import AdminUsers from "./pages/AdminUsers";
import High from "./pages/High";
import Medium from "./pages/Medium";
import Low from "./pages/Low";
import Backlog from "./pages/Backlog";

import Pricing from "./components/Pricing";
import CreateBlog from "./pages/Admin/CreateBlog";
import BlogPage from "./pages/BlogPage";
import PricingPage from "./pages/PricingPage";
import Blogs from "./pages/Admin/Blogs";
import UpdateBlog from "./pages/Admin/UpdateBlog";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/invite" element={<Invite />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/blog/:id" element={<BlogPage />}></Route>
          <Route path="/" element={<Hero />}></Route>
          <Route element={<ProtectedRoute roleRequired={"user"} />}>
            <Route path="/workspace" element={<DashboardLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<Project />} />
              <Route path="users" element={<Users />} />
              <Route path="teams" element={<Teams />} />
              <Route path="priority/high" element={<High />} />
              <Route path="priority/medium" element={<Medium />} />
              <Route path="priority/low" element={<Low />} />
              <Route path="priority/backlog" element={<Backlog />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute roleRequired={"admin"} />}>
            <Route path="/Admin" element={<AdminPage />}>
              <Route path="users" element={<AdminUsers />}></Route>
              <Route path="blogs" element={<Blogs />}></Route>
              <Route path="blogs/create" element={<CreateBlog />}></Route>
              <Route path="blogs/:id" element={<UpdateBlog />}></Route>
              <Route path="projects" element={<Projects />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
