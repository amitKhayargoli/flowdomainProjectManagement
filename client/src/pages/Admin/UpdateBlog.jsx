import React, { useEffect, useState } from "react";
import { api } from "../../api";
import axios from "axios";
import ReusableBlogForm from "./ReusableBlogForm";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateBlog = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // To store the current image URL

  // Fetch the blog details by ID
  const getBlogById = async (id) => {
    try {
      const response = await api.getBlogById(id);
      setTitle(response.title);
      setContent(response.content);
      setCategory(response.category);
      setImageUrl(response.imageUrl || ""); // Set the current image URL from the response
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  useEffect(() => {
    getBlogById(id);
  }, [id]);

  // Handle the blog update
  const handleUpdateBlog = async (e) => {
    e.preventDefault();

    try {
      let updatedImageUrl = imageUrl; // Use the current image URL as default

      // Only upload a new file if selected
      if (selectedFile) {
        const token = localStorage.getItem("token");
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

        updatedImageUrl =
          "http://localhost:5000/" + uploadResponse.data.file.path;

        if (!updatedImageUrl) {
          throw new Error("File URL is missing from response");
        }
      }

      // Update the blog with the new data
      await api.updateBlog(id, {
        title,
        content,
        category,
        imageUrl: updatedImageUrl,
      });

      toast.success("Blog updated successfully");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    }
  };

  return (
    <ReusableBlogForm
      method={handleUpdateBlog}
      heading="Update a blog"
      btnText="Update blog"
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      category={category}
      setCategory={setCategory}
      selectedFile={selectedFile}
      setSelectedFile={setSelectedFile}
      imageUrl={imageUrl}
    />
  );
};

export default UpdateBlog;
