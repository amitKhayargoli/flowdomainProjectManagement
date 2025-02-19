import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectHeader from "./ProjectHeader";
import Board from "../BoardView";
import List from "../ListView";
import Table from "../TableView";
import ModalNewTask from "./Modals/ModalNewTask";
import axios from "axios";
import useTheme from "../../../lib/utils/useTheme";

const Project = () => {
  const { id } = useParams();
  const [theme, toggleTheme] = useTheme();
  const [projectData, setProjectData] = useState(null);
  const [activeTab, setActiveTab] = useState("Board");
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`/api/projects/${id}`);
        setProjectData(response.data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData();
  }, [id]);

  if (!projectData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      <ModalNewTask
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        id={id}
      />
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Board" && (
        <Board id={id} setIsNewTaskOpen={setIsNewTaskOpen} />
      )}

      {activeTab === "List" && (
        <List id={id} setIsNewTaskOpen={setIsNewTaskOpen} />
      )}

      {activeTab === "Table" && (
        <Table id={id} setIsNewTaskOpen={setIsNewTaskOpen} />
      )}
    </div>
  );
};

export default Project;
