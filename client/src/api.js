import axios from "axios";
import {
  deleteTask,
  updateTask,
} from "../../server/controllers/taskController";

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

  getTaskbyId: async (taskId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching task by ID:", error);
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

  updateTask: async (taskId, updatedTaskData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/tasks/${taskId}`,
        updatedTaskData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  deleteTask: async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  },
};
