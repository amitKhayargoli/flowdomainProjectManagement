import { format } from "date-fns";
import { Calendar, Flag } from "lucide-react";

const priorityColors = {
  Low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
  Medium:
    "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
  High: "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-white-200",
  Backlog: "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-white",
};

const ListViewCard = ({ task }) => {
  return (
    <div className=" relative mb-3 rounded-lg bg-white shadow dark:bg-[#1d1f21] dark:text-white transition-all duration-300 hover:shadow-lg">
      {/* Check for attachments */}
      {task.fileURL ? (
        <div className="aspect-[16/9] overflow-hidden mb-4 rounded-t-lg">
          <img
            src={task.fileURL}
            alt={task.fileURL}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      ) : (
        <div className="mb-4 text-gray-500 dark:text-gray-400 text-xl mx-2">
          No attachments available
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1 dark:text-gray-400">
              #{task.id}
            </p>
            <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-gray-100">
              {task.title}
            </h3>
          </div>

          <div className="inline-flex items-center rounded-full border px-4 py-1 text-sm font-semibold text-foreground dark:text-gray-300 border-gray-300  dark:border-gray-700">
            {task.status}
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {task.description || "No description provided"}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>
              {task.startDate
                ? format(new Date(task.startDate), "MMM dd")
                : "Not set"}{" "}
              -{" "}
              {task.dueDate
                ? format(new Date(task.dueDate), "MMM dd, yyyy")
                : "Not set"}
            </span>
          </div>
          {/* Priority */}
          {task.priority && (
            <div
              className={`absolute top-3 right-3 flex items-center ${
                priorityColors[task.priority]
              } font-medium px-2 py-0.5 rounded-md`}
            >
              <Flag className="w-3 h-3 mr-1" />
              {task.priority}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListViewCard;
