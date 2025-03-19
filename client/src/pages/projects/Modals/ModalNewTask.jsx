import React, { useState } from "react";
import { formatISO } from "date-fns";
import Modal from "../../../components/Modal";
import { createTask } from "../../../../../server/controllers/taskController";
import { api } from "../../../api";
import axios from "axios";

export const Status = {
  ToDo: "To do",
  WorkInProgress: "Work In Progress",
  UnderReview: "Under Review",
  Completed: "Completed",
};

export const Priority = {
  High: "High",
  Medium: "Medium",
  Low: "Low",
  Backlog: "Backlog",
};

const ModalNewTask = ({ isOpen, onClose, id }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileLabel, setFileLabel] = useState("Upload an attachment");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(Status.ToDo);
  const [priority, setPriority] = useState(Priority.Medium);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    if (!title) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });

    const formattedEndDate = formatISO(new Date(dueDate), {
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
      await api.createTask({
        title,
        description,
        status,
        priority,
        tags,
        startDate: formattedStartDate,
        dueDate: formattedEndDate,
        fileURL: imageUrl,
        projectId: Number(id),
      });

      setTitle("");
      setDescription("");
      setStatus(Status.ToDo);
      setPriority(Priority.Medium);
      setTags("");
      setStartDate("");
      setDueDate("");
      setSelectedFile(null);
      setFileName("");
      setFileLabel("Upload an attachment");

      setIsLoading(false); // Set loading state to false
      onClose(); // Close the modal after creating the task
    } catch (error) {
      console.error("Error creating task:", error);
      setIsLoading(false); // Set loading state to false in case of error
    }
  };

  const isFormValid = () => {
    return (
      title &&
      startDate &&
      dueDate &&
      status &&
      fileLabel == "Image Uploaded..."
    );
  };

  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 focus:outline-none px-3 dark:border-none py-2  dark:bg-gray-700 dark:text-white dark:focus:outline-none";

  const inputStyles =
    "w-full rounded border border-gray-300 focus:outline-none dark:border-none p-2 shadow-sm  dark:bg-gray-700 dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
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
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="sm-gap-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <select
            className={selectStyles}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value={Status.ToDo}>To do</option>
            <option value={Status.WorkInProgress}>Work In Progress</option>
            <option value={Status.UnderReview}>Under Review</option>
            <option value={Status.Completed}>Completed</option>
          </select>

          <select
            className={selectStyles}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select Priority</option>
            <option value={Priority.High}>High</option>
            <option value={Priority.Medium}>Medium</option>
            <option value={Priority.Low}>Low</option>
            <option value={Priority.Backlog}>Backlog</option>
          </select>
        </div>

        <input
          type="text"
          className={inputStyles}
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
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
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
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
            name="file-upload"
            onChange={handleImageUpload}
          />
        </div>

        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600  focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid()}
        >
          {isLoading ? "Creating" : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;
