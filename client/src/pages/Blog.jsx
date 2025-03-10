import React, { useState } from "react";

const Blog = () => {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(""); // Category state

  const handleContentChange = (event) => {
    setContent(event.target.value); // Update content
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value); // Update category
  };

  return (
    <div className="p-3 flex flex-col items-center  w-full">
      <h1 className="text-center text-3xl my-7 font-semibold dark:text-white">
        Create a post
      </h1>
      <form className="flex flex-col gap-4 md:w-250">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Title"
            required
            id="title"
            className="text-xl flex-1 h-10 p-4 bg-white text-black dark:bg-gray-600 dark:text-black outline-none shadow-xl rounded-md"
          />
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className="text-md flex-1 py-2 md:py-0  md:h-10 px-4 bg-white text-black dark:bg-gray-600 dark:text-black outline-none shadow-xl rounded-md md:ml-4"
          >
            <option value="">Select Category</option>
            <option value="coding">Coding</option>
            <option value="movies">Movies</option>
            <option value="tv">TV</option>
            <option value="music">Music</option>
            <option value="sports">Sports</option>
          </select>
        </div>

        <div className="flex justify-between items-center mt-4 gap-5">
          <input
            accept="image/*"
            id="file"
            name="file"
            type="file"
            className="flex flex-1 file:bg-[#1f2936] file:p-3 file:text-md file:text-white file:mr-4 font-bold rounded-md bg-white shadow-xl"
          />
          <label htmlFor="file" className="flex max-sm:flex-1 ">
            <span className="w-full ml-2 text-sm font-semibold dark:text-gray-200 rounded-lg cursor-pointer text-white bg-[#1f2936] p-2 md:p-4 px-4">
              Upload image
            </span>
          </label>
        </div>

        <div className="mt-4 w-full">
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Write your post content here..."
            rows="12"
            className="text-lg p-4 w-full bg-white text-black dark:bg-gray-600 dark:text-black outline-none shadow-xl rounded-md"
          />
        </div>

        <button className="ml-2 text-lg font-semibold dark:text-gray-200 rounded-lg cursor-pointer text-white bg-[#1f2936] p-3 px-4">
          Post Blog
        </button>
      </form>
    </div>
  );
};

export default Blog;
