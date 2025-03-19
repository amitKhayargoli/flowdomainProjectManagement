import { useEffect, useState } from "react";
import {
  BarChart,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
} from "recharts";

import { api } from "../api";

const Dashboard = () => {
  const [totalProjects, setTotalProjects] = useState("");
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeTasks, setActiveTasks] = useState("");
  const [activeUsers, setActiveUsers] = useState("");
  const [projectData, setProjectData] = useState([
    { month: "Jan", projects: 0 },
    { month: "Feb", projects: 0 },
    { month: "Mar", projects: 0 },
    { month: "Apr", projects: 0 },
    { month: "May", projects: 0 },
    { month: "Jun", projects: 0 },
  ]);

  const [taskData, setTaskData] = useState([
    { Status: "High", tasks: 0 },
    { Status: "Medium", tasks: 0 },
    { Status: "Low", tasks: 0 },
    { Status: "Backlog", tasks: 0 },
  ]);

  // Fetch projects and update project data
  const fetchProjectCount = async () => {
    try {
      const response = await api.getProjects();
      const projects = response.projects;
      setProjects(projects);
      setTotalProjects(projects.length);

      const monthCounts = {
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        May: 0,
        Jun: 0,
      };

      projects.forEach((project) => {
        const startMonth = new Date(project.startDate).toLocaleString(
          "default",
          {
            month: "short",
          }
        );
        if (monthCounts[startMonth] !== undefined) {
          monthCounts[startMonth]++;
        }
      });

      setProjectData((prevData) =>
        prevData.map((item) => ({
          ...item,
          projects: monthCounts[item.month] || 0,
        }))
      );
    } catch (error) {
      console.error("Error fetching project count:", error);
    }
  };

  useEffect(() => {
    fetchProjectCount();
  }, []);

  // Fetch tasks and update task data
  const fetchTaskCount = async () => {
    try {
      const tasks = await api.getUserTasks();
      setTasks(tasks);
      setActiveTasks(tasks.length);

      const taskCounts = {
        High: 0,
        Medium: 0,
        Low: 0,
        Backlog: 0,
      };

      tasks.forEach((task) => {
        const priority = task.priority;
        if (taskCounts[priority] !== undefined) {
          taskCounts[priority]++;
        }
      });

      setTaskData((prevData) =>
        prevData.map((item) => ({
          ...item,
          tasks: taskCounts[item.Status] || 0,
        }))
      );
    } catch (error) {
      console.error("Error fetching task count:", error);
    }
  };

  useEffect(() => {
    fetchTaskCount();
  }, []);

  // Fetch active users
  const fetchUserCount = async () => {
    try {
      const users = await api.getUsersbyTeam();
      setActiveUsers(users.data.length);
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  useEffect(() => {
    fetchUserCount();
  }, []);

  const statsData = {
    totalProjects: totalProjects,
    activeTasks: activeTasks,
    activeUsers: activeUsers,
  };

  return (
    <div className="p-8 animate-fadeIn">
      <h1 className="text-2xl font-bold mb-8 dark:text-white">
        Dashboard Overview
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 dark:text-white">
        <StatCard title="Total Projects" value={statsData.totalProjects} />
        <StatCard title="Active Tasks" value={statsData.activeTasks} />
        <StatCard title="Active Users" value={statsData.activeUsers} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 dark:text-white">
        <ChartCard title="Tasks Distribution">
          <BarChart width={400} height={300} data={taskData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Status" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tasks" fill="#6366F1" />
          </BarChart>
        </ChartCard>

        <ChartCard title="Project Timeline">
          <LineChart width={400} height={300} data={projectData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="projects"
              stroke="#6366F1"
              strokeWidth={2}
            />
          </LineChart>
        </ChartCard>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
    <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 flex flex-col items-center">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="w-full flex justify-center">{children}</div>
  </div>
);

export default Dashboard;
