import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { useForm } from "react-hook-form";
import { formatISO } from "date-fns";
import { api } from "../../../api";
import axios from "axios";
import { toast } from "react-toastify";

const ModalEditProject = ({ id, isOpen, onClose, projects, fetchProjects }) => {
  const inputStyles =
    "w-full rounded border focus:outline-none border-gray-300 p-2 shadow-sm dark:border-none dark:bg-gray-700 dark:text-white";

  const [project, setProject] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileLabel, setFileLabel] = useState("Upload a new project cover");

  const { register, handleSubmit, setValue } = useForm();

  const currentProject = projects.find((project) => project.id === id);

  useEffect(() => {
    if (currentProject) {
      setProject(currentProject);

      setValue("name", currentProject.name || "");
      setValue("description", currentProject.description || "");
      setValue(
        "startDate",
        currentProject.startDate ? currentProject.startDate.split("T")[0] : ""
      );
      setValue(
        "endDate",
        currentProject.endDate ? currentProject.endDate.split("T")[0] : ""
      );

      setFileLabel(
        currentProject.coverURL
          ? "Image Uploaded..."
          : "Upload a new project cover"
      );
    }
  }, [currentProject, setValue]);

  const onSubmit = async (data) => {
    const formattedStartDate = formatISO(new Date(data.startDate), {
      representation: "complete",
    });
    const formattedEndDate = formatISO(new Date(data.endDate), {
      representation: "complete",
    });

    let imageUrl = project?.coverURL;

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
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Failed to upload file!");
        return;
      }
    }

    const updatedProjectData = {
      ...data,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      coverURL: imageUrl, // Use the updated imageUrl, which might be the old or new one
    };

    try {
      await api.updateProject(id, updatedProjectData);
      fetchProjects();
      onClose();
      toast.success("Project updated successfully!");
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project!");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileLabel("Image Uploaded...");
    }
  };

  const handleDeleteProject = async (e) => {
    e.preventDefault();
    try {
      await api.deleteProject(id);
      toast.success("Project deleted successfully!");
      fetchProjects();
      onClose();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project!");
    }
  };

  const isFormValid = () => {
    return fileLabel === "Image Uploaded..." || !selectedFile;
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Edit Project">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          className={inputStyles}
          placeholder="Project Name"
          {...register("name", { required: true })}
        />

        <textarea
          className={inputStyles}
          placeholder="Description"
          {...register("description", { required: true })}
        />

        <div className="grid grid-cols-2 gap-6">
          <input
            type="date"
            className={inputStyles}
            {...register("startDate", { required: true })}
          />
          <input
            type="date"
            className={inputStyles}
            {...register("endDate", { required: true })}
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="file-upload"
            className="w-full flex items-center justify-center bg-gray-100 text-dark dark:bg-[#364153] dark:text-white font-medium text-base py-2.5 px-4 rounded cursor-pointer"
          >
            {fileLabel}
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <button
            type="submit"
            className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border bg-blue-600 border-transparent  px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              !isFormValid() ? "cursor-not-allowed opacity-50" : "opacity-100"
            }`}
            disabled={!isFormValid()}
          >
            Update project
          </button>

          <button
            onClick={handleDeleteProject}
            type="button"
            className="cursor-pointer flex w-full justify-center rounded-md border bg-[#de262f] border-transparent px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none"
          >
            Delete
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalEditProject;
