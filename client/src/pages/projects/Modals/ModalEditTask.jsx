import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { useForm } from "react-hook-form";
import { formatISO } from "date-fns";
import { api } from "../../../api";
import { toast } from "react-toastify";
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

const ModalEditTask = ({ isOpen, onClose, id, task, fetchTasks }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileLabel, setFileLabel] = useState("Add an attachment");
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    if (task) {
      setValue("title", task.title || "");
      setValue("description", task.description || "");
      setValue("priority", task.priority || "");
      setValue("comment", task.comment || "");

      const formattedStartDate = task.startDate
        ? new Date(task.startDate).toISOString().split("T")[0]
        : "";
      const formattedDueDate = task.dueDate
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : "";
      setValue("startDate", formattedStartDate);
      setValue("dueDate", formattedDueDate);

      // Retain the previous image URL (if it exists)
      if (task.fileURL) {
        setFileLabel("Image already attached");
      }
    }
  }, [task, setValue]);

  const onSubmit = async (data) => {
    const formattedStartDate = formatISO(new Date(data.startDate), {
      representation: "complete",
    });

    const formattedEndDate = formatISO(new Date(data.dueDate), {
      representation: "complete",
    });

    let imageUrl = task.fileURL; // Default to the existing file URL (if any)

    // Only upload the new file if one has been selected
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const token = localStorage.getItem("token");
        const uploadResponse = await axios.post(
          "http://localhost:5000/api/file/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (uploadResponse.data?.file?.path) {
          imageUrl = `http://localhost:5000/${uploadResponse.data.file.path}`;
        } else {
          console.error("File upload failed, no path received");
        }
      } catch (err) {
        console.error("Error uploading file:", err);
        toast.error("Failed to upload file!");
        return;
      }
    }

    const updatedTaskData = {
      ...data,
      startDate: formattedStartDate,
      dueDate: formattedEndDate,
      fileURL: imageUrl, // Use the previous image URL if no new image is uploaded
    };

    api
      .updateTask(task.id, updatedTaskData)
      .then((response) => {
        reset();
        onClose();
        toast.success("Task updated successfully!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleDeleteTask = () => {
    api.deleteTask(task.id).then(() => {
      onClose();
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileLabel("Image Uploaded...");
    } else {
      setSelectedFile(null); // In case file is removed, reset the state
      setFileLabel("Add an attachment");
    }
  };

  const selectStyles =
    "mb-4 text-md text-gray-600 block w-full rounded border border-gray-300 focus:outline-none px-3 dark:border-none py-2 dark:bg-gray-700 dark:text-white dark:focus:outline-none";

  const inputStyles =
    "w-full rounded border mt-1 mb-5 focus:outline-none border-gray-300 p-2 shadow-sm dark:border-none dark:bg-gray-700 dark:text-white dark:focus:outline-none";

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} name="Update task">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className={`h-8 py-6 text-lg ${inputStyles}`}
            placeholder="Task Name"
            {...register("title")}
          />
          <div className="space-y-6">
            <div className="flex flex-col flex-1 gap">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <h1 className="dark:text-white text-lg ml-2">Description</h1>
                </div>
                <div className="flex">
                  <textarea
                    {...register("description")}
                    className={`rounded-sm text-md ${inputStyles}`}
                    placeholder="Add a detailed description"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <h1 className="dark:text-white text-lg ml-2">Priority</h1>
                <select
                  {...register("priority")}
                  required
                  className={selectStyles}
                >
                  <option value="">Select Priority</option>
                  <option value={Priority.High}>High</option>
                  <option value={Priority.Medium}>Medium</option>
                  <option value={Priority.Low}>Low</option>
                  <option value={Priority.Backlog}>Backlog</option>
                </select>
              </div>

              <div className="flex flex-col">
                <div className="sm-gap-2">
                  <h1 className="dark:text-white text-lg ml-2">Start Date</h1>
                  <div>
                    <input
                      {...register("startDate")}
                      type="date"
                      className={inputStyles}
                      required
                    />
                    <h1 className="dark:text-white text-lg ml-2">Due Date</h1>
                    <input
                      {...register("dueDate")}
                      type="date"
                      className={inputStyles}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-8 font-[sans-serif]">
                  <input
                    type="file"
                    id="file-upload"
                    name="file-upload"
                    onChange={handleImageUpload}
                    className="w-full dark:bg-gray-900 text-gray-500 font-medium text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <button
                type="submit"
                className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border bg-blue-600 border-transparent px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 `}
              >
                Update Task
              </button>
              <button
                onClick={handleDeleteTask}
                type="button"
                className="cursor-pointer flex w-full justify-center rounded-md border bg-[#de262f] border-transparent px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none"
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalEditTask;
