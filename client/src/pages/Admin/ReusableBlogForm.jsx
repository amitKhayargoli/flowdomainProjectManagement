import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ReusableBlogForm = ({
  method,
  heading,
  btnText,
  title,
  setTitle,
  content,
  setContent,
  category,
  setCategory,
  selectedFile,
  setSelectedFile,
}) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="p-3 flex flex-col items-center w-full">
      <h1 className="text-center text-3xl my-7 font-semibold dark:text-white">
        {heading}
      </h1>
      <form className="flex flex-col gap-4 md:w-250" onSubmit={method}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Title"
            required
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl flex-1 h-10 p-4 bg-white text-black dark:bg-gray-600 dark:text-black outline-none shadow-xl rounded-md"
          />
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-md flex-1 py-2 md:py-0 md:h-10 px-4 bg-white text-black dark:bg-gray-600 dark:text-black outline-none shadow-xl rounded-md md:ml-4"
          >
            <option value="">Select Category</option>
            <option value="Coding">Coding</option>
            <option value="Movies">Movies</option>
            <option value="TV">TV</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Productivity">Productivity</option>
          </select>
        </div>

        <div className="flex justify-between items-center mt-4 gap-5">
          <input
            accept="image/*"
            id="file"
            name="file"
            type="file"
            // required
            onChange={handleImageUpload}
            className="flex flex-1 file:bg-[#1f2936] file:p-3 file:text-md file:text-white file:mr-4 font-bold rounded-md bg-white shadow-xl"
          />
          <label htmlFor="file" className="flex max-sm:flex-1 ">
            <span className="w-full ml-2 text-sm font-semibold dark:text-gray-200 rounded-lg cursor-pointer text-white bg-[#1f2936] p-2 md:p-4 px-4">
              Upload image
            </span>
          </label>
        </div>

        <div className="mt-4 w-full mb-5 ">
          {/* Use React Quill for rich text editing */}
          <ReactQuill
            value={content}
            onChange={setContent}
            placeholder="Write your post content here..."
            className="text-lg p-4 w-full bg-white text-black dark:bg-gray-600 dark:text-black outline-none  overflow-hidden shadow-xl rounded-md"
          />
        </div>

        <button
          type="submit"
          className="ml-2 text-lg font-semibold dark:text-gray-200 rounded-lg cursor-pointer text-white bg-[#1f2936] p-3 px-4"
        >
          {btnText}
        </button>
      </form>
    </div>
  );
};

export default ReusableBlogForm;
