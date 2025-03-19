import axios from "axios";
import {
  deleteTask,
  updateTask,
} from "../../server/controllers/taskController";

const API_BASE_URL = "http://localhost:5000";

const token = localStorage.getItem("token");

export const api = {
  getProjects: async () => {
    try {
      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      const response = await axios.get(`${API_BASE_URL}/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },

  //Admin
  getAllProjects: async (req) => {
    try {
      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      const userRole = req.user.role;

      if (userRole !== "admin") {
        throw new Error("Access denied. Admins only.");
      }

      const response = await axios.get(`${API_BASE_URL}/projects/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },

  createProject: async (projectData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/projects/create`,
        projectData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  },

  updateProject: async (projectId, projectData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/projects/${projectId}`,
        projectData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  },

  deleteProject: async (projectId) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/projects/delete/${projectId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  },

  deleteUserbyId: async (userId) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/user/delete/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting user by id:", error);
      throw error;
    }
  },

  updateUser: async (userData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_BASE_URL}/api/user`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  getUsersbyTeam: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/user/team`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching users by team:", error);
      throw error;
    }
  },

  getAllUsers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }
  },

  getCurrentUserProjectTeams: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/team`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching current user's project teams:", error);
      throw error;
    }
  },

  //Tasks related to projectId
  getTasks: async (projectId) => {
    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/tasks?projectId=${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token directly in header
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  getUserTasks: async () => {
    const token = localStorage.getItem("token"); // Retrieve token here
    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }

    try {
      console.log("Making request with token:", token); // Debug log
      const response = await axios.get(`${API_BASE_URL}/tasks/getUserTasks/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user's tasks:", error.response || error);
      throw error;
    }
  },

  getTaskbyId: async (taskId) => {
    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching task by ID:", error);
      throw error;
    }
  },

  deleteAccount: async () => {
    try {
      await axios.put(`${API_BASE_URL}/api/user/deleteAccount`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(token);
      console.error("Error deleting account:", error);
      throw error;
    }
  },
  createTask: async (taskData) => {
    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/tasks/create`,
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  updateTaskStatus: async (taskId, status) => {
    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/tasks/${taskId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating task status:", error);
      throw error;
    }
  },

  updateTask: async (taskId, updatedTaskData) => {
    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/tasks/${taskId}`,
        updatedTaskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  deleteTask: async (taskId) => {
    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  },

  uploadFile: async (data) => {
    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }

    try {
      const uploadResponse = await axios.post(
        "http://localhost:5000/api/file/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Directly use token in header
          },
        }
      );
      return uploadResponse.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  },

  generateInvite: async (projectId) => {
    try {
      console.log(projectId);
      const response = await axios.post(
        `${API_BASE_URL}/projects/invite`,
        { projectId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Invite Token:", response.data.inviteToken);
    } catch (error) {
      console.error("Error generating invite:", error);
    }
  },

  createBlog: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/blog`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating blog:", error);
      throw error;
    }
  },

  getAllBlogs: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/blog`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching all blogs:", error);
      throw error;
    }
  },

  getBlogById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/blog/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching blog by ID:", error);
      throw error;
    }
  },

  deleteBlog: async (id) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/blog/delete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error deleting blog:", error);
      throw error;
    }
  },
  updateBlog: async (id, updatedBlogData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/blog/${id}`,
        updatedBlogData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating blog:", error);
      throw error;
    }
  },
};
