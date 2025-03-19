import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { format, parseISO } from "date-fns";
import { Pencil, Search, Trash2 } from "lucide-react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [category, setCategory] = useState(null);
  const [active, setActive] = useState("");
  const [blogImage, setBlogImage] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const FetchBlogs = async () => {
    const response = await api.getAllBlogs();
    setBlogs(response);
    setBlogImage(response.imageUrl);
    setFilteredBlogs(response);
  };
  useEffect(() => {
    FetchBlogs();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (category && category !== "All blogs") {
      setFilteredBlogs(
        blogs.filter(
          (blog) => blog.category.toLowerCase() === category.toLowerCase()
        )
      );
      setSearchQuery("");
    } else {
      setFilteredBlogs(blogs);
    }
  }, [category, blogs]);

  useEffect(() => {
    const handleSearch = () => {
      const filtered = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBlogs(filtered);
      setCategory("All blogs");
    };
    handleSearch();
  }, [searchQuery]);

  const handleDelete = async (id) => {
    try {
      const response = await api.deleteBlog(id);
      FetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };
  return (
    <div className="p-5 md:p-10">
      <div className="md:flex items-center justify-between ">
        <h1 className=" text-3xl  mb-8 md:mb-15 dark:text-white">All blogs</h1>

        <div className="flex mb-8 flex-wrap gap-2">
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-lg flex px-4 py-4 md:py-0  md:h-15  bg-white text-black dark:bg-gray-600 dark:text-black focus:outline-none shadow-xl rounded-md md:ml-4"
          >
            <option value="">All blogs</option>
            <option value="Coding">Coding</option>
            <option value="Movies">Movies</option>
            <option value="TV">TV</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Productivity">Productivity</option>
          </select>

          <div className="flex  text-xl shadow-xl relative bg-white rounded-md">
            <Search className="absolute top-6 md:top-4 left-2"></Search>
            <input
              type="text"
              className="p-6 px-10 md:p-4 md:pl-10 outline-none "
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid-cols-1 md:grid md:grid-cols-3 gap-15">
        {filteredBlogs.map((blog) => (
          <div
            onClick={() => {
              //   navigate(`${blog.id}`);
            }}
            key={blog.id}
            className="mb-8 md:mb-0 cursor-pointer hover:scale-105 transition duration-600 relative group shadow-xl"
          >
            {/* Edit and delelete */}
            <div className="absolute bottom-6 right-4 flex md:opacity-0 group-hover:opacity-100 transition duration-300">
              <button
                onClick={() => navigate(`${blog.id}`)}
                className="hover:cursor-pointer transition duration-300 hover:scale-105 mr-1 dark:text-white"
              >
                <Pencil></Pencil>
              </button>

              <button
                className="hover:cursor-pointer transition duration-300 hover:scale-105 dark:text-red-400"
                onClick={() => handleDelete(blog.id)}
              >
                <Trash2></Trash2>
              </button>
            </div>

            <div className="h-[250px] overflow-hidden rounded-t-xl">
              <img
                src={blog.imageUrl}
                className="object-cover w-full"
                alt={blog.title}
              />
            </div>

            <div className="p-6">
              <h1 className="text-lg dark:text-white">{blog.category}</h1>
              <p className="text-2xl font-bold mt-2 dark:text-white">
                {blog.title}
              </p>
              <p
                className="text-xl mt-2 text-gray-500 line-clamp-2 overflow-hidden text-ellipsis dark:text-white"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              ></p>
              <h4 className="text-lg mt-2 dark:text-white ">
                {format(parseISO(blog.createdAt), "MMMM dd, yyyy")}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
