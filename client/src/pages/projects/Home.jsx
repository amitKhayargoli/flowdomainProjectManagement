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
  const [project, setProject] = useState([]);
  const [activeTab, setActiveTab] = useState("Board");
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/projects/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProject(response.data.name);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjectData();
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }
  // custom-gradient
  return (
    <div className="h-full ">
      <ModalNewTask
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        id={id}
      />
      <ProjectHeader
        project={project}
        id={id}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

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
