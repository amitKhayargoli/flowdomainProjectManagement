import React, { useEffect, useState } from "react";
import { formatISO } from "date-fns";
import Modal from "../../../components/Modal";
import { createProject } from "../../../../../server/controllers/projectController";
import { api } from "../../../api";
import { toast } from "react-toastify";
import axios from "axios";

const ModalNewProject = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileLabel, setFileLabel] = useState("Upload a project cover");

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/init",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCurrentUser(response.data.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      setFileLabel("Image Uploaded...");
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!projectName || !startDate || !endDate) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });

    const formattedEndDate = formatISO(new Date(endDate), {
      representation: "complete",
    });

    try {
      let imageUrl = "";

      if (selectedFile) {
        const data = new FormData();
        data.append("file", selectedFile);

        const uploadResponse = await axios.post(
          "http://localhost:5000/api/file/upload",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        imageUrl = "http://localhost:5000/" + uploadResponse.data.file.path;

        if (!imageUrl) {
          throw new Error("File URL is missing from response");
        }
      }
      await api.createProject({
        name: projectName,
        description,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        coverURL: imageUrl,
      });

      setProjectName("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setSelectedFile(null);
      setFileName("");
      setFileLabel("Upload a project cover");
      setIsLoading(false); // Set loading state to false

      onClose(); // Close the modal after creating the project
    } catch (error) {
      console.error("Error creating project:", error);
      setIsLoading(false); // Set loading state to false in case of error
    }
  };

  const isFormValid = () => {
    return (
      projectName &&
      description &&
      startDate &&
      endDate &&
      fileLabel == "Image Uploaded..."
    );
  };

  const inputStyles =
    "w-full rounded border focus:outline-none border-gray-300 p-2 shadow-sm dark:border-none dark:bg-gray-700  dark:text-white dark:focus:outline-none";

  if (!isOpen) return null;
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
        <div className="w-full">
          <label
            htmlFor="file-upload"
            className="w-full flex items-center justify-center dark:bg-[#364153] bg-gray-100 text-dark dark:text-white font-medium text-base py-2.5 px-4 rounded cursor-pointer file:hidden"
          >
            {fileLabel}
          </label>
          <input
            id="file-upload"
            className="hidden"
            type="file"
            accept="image/*"
            name="file-upload"
            onChange={handleImageUpload}
          />
        </div>

        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border  bg-blue-600 border-transparent  px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading
              ? "cursor-not-allowed opacity-50"
              : "opacity-100"
          }`}
          disabled={!isFormValid()}
        >
          {isLoading ? "Creating" : "Create Project"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewProject;
