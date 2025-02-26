import React, { useState } from "react";
import { formatISO } from "date-fns";
import Modal from "../../../components/Modal";
import { createTask } from "../../../../../server/controllers/taskController";
import { api } from "../../../api";

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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(Status.ToDo);
  const [priority, setPriority] = useState(Priority.Medium);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !authorUserId) return;

    setIsLoading(true);

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });

    const formattedEndDate = formatISO(new Date(dueDate), {
      representation: "complete",
    });

    try {
      await api.createTask({
        title,
        description,
        status,
        priority,
        tags,
        startDate: formattedStartDate,
        dueDate: formattedEndDate,
        authorUserId: parseInt(authorUserId),
        assignedUserId: parseInt(assignedUserId),
        projectId: Number(id),
      });

      console.log(status);
      setIsLoading(false); // Set loading state to false
      onClose(); // Close the modal after creating the task
    } catch (error) {
      console.error("Error creating task:", error);
      setIsLoading(false); // Set loading state to false in case of error
    }
  };

  const isFormValid = () => {
    return title && authorUserId && startDate && dueDate && status;
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

        <input
          type="text"
          className={inputStyles}
          placeholder="Author User Id"
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
        />

        <input
          type="text"
          className={inputStyles}
          placeholder="Assigned User Id"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        />

        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600  focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating" : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;
