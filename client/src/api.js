import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const api = {
  getProjects: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects`);
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
        projectData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  },

  getTasks: async (projectId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/tasks?projectId=${projectId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/tasks/create`,
        taskData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  updateTaskStatus: async (taskId, status) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/tasks/${taskId}/status`,
        {
          status,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating task status:", error);
      throw error;
    }
  },
};
