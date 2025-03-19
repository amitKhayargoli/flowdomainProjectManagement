import React, { useState } from "react";
import { api } from "../../api";
import axios from "axios";
import ReusableBlogForm from "./ReusableBlogForm";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";

      const token = localStorage.getItem("token");
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

      await api.createBlog({ title, content, category, imageUrl });

      setTitle("");
      setContent("");
      setCategory("");
      setSelectedFile("");
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <ReusableBlogForm
      method={handleCreateBlog}
      heading="Create a post"
      btnText="Post blog"
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      category={category}
      setCategory={setCategory}
      selectedFile={selectedFile}
      setSelectedFile={setSelectedFile}
    />
  );
};

export default CreateBlog;
