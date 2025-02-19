import React, { useState } from "react";
import { formatISO } from "date-fns";
import Modal from "../../../components/Modal";
import { createProject } from "../../../../../server/controllers/projectController";
import { api } from "../../../api";

const ModalNewProject = ({ isOpen, onClose }) => {
  console.log("Modal isOpen state:", isOpen);

  if (!isOpen) return null;

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add the isLoading state

  const handleSubmit = async () => {
    if (!projectName || !startDate || !endDate) return;

    setIsLoading(true); // Set loading state to true

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });

    const formattedEndDate = formatISO(new Date(endDate), {
      representation: "complete",
    });

    try {
      await api.createProject({
        name: projectName,
        description,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
      setIsLoading(false); // Set loading state to false
      toastify.success("Project created successfully");
      onClose(); // Close the modal after creating the project
    } catch (error) {
      console.error("Error creating project:", error);
      setIsLoading(false); // Set loading state to false in case of error
    }
  };

  const isFormValid = () => {
    return projectName && description && startDate && endDate;
  };

  const inputStyles =
    "w-full rounded border focus:outline-none border-gray-300 p-2 shadow-sm dark:border-black dark:bg-gray-700  dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
      <form
        action=""
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="sm-gap-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            type="date"
            className={inputStyles}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border  bg-blue-600 border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading
              ? "cursor-not-allowed opacity-50"
              : "opacity-100"
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating" : "Create Project"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewProject;
