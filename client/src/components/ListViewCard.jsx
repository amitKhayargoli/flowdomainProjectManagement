import { format } from "date-fns";

import React, { useEffect } from "react";

const ListViewCard = ({ task }) => {
  return (
    <div className="mb-3 rounded bg-white p-5 shadow dark:bg-[#1d1f21] dark:text-white">
      {/* Check for attachments */}
      {task.fileURL ? (
        <div className="mb-4">
          <strong>Attachments</strong>
          <div className="flex-wray flex">
            <img
              src={`${task.fileURL}`}
              alt={task.fileURL}
              width={400}
              height={200}
              className="mt-2 rounded-md"
            />
          </div>
        </div>
      ) : (
        <div>No attachments available</div> // Optional fallback
      )}

      <p>
        <strong>ID:</strong> {task.id}
      </p>
      <p>
        <strong>Title:</strong> {task.title}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {task.description || "No description Provided"}
      </p>
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <p>
        <strong>Tags:</strong> {task.tags}
      </p>
      <p>
        <strong>Start Date:</strong>{" "}
        {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
      </p>
      <p>
        <strong>Due Date:</strong>{" "}
        {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
      </p>
    </div>
  );
};

export default ListViewCard;
