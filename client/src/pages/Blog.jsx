import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HomeNav from "../components/HomeNav";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [category, setCategory] = useState(null);
  const [active, setActive] = useState("");

  useEffect(() => {
    const FetchBlogs = async () => {
      const response = await api.getAllBlogs();
      setBlogs(response);
      setFilteredBlogs(response);
    };
    FetchBlogs();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      setFilteredBlogs(
        blogs.filter(
          (blog) => blog.category.toLowerCase() === category.toLowerCase()
        )
      );
    } else {
      setFilteredBlogs(blogs);
    }
  }, [category, blogs]);

  return (
    <>
      <HomeNav />

      <div className="bg-black text-white px-10 md:px-40 flex-col md:flex md:flex-row gap-50 py-20">
        <div className="md:flex-col w-30">
          <h1 className="text-5xl font-bold">Blog</h1>
          <h2 className="text-xl text-gray-400 mt-5">My compiled blog posts</h2>

          <ul className="flex flex-col gap-3 text-lg text-gray-400 mt-10">
            {["Sports", "Coding", "Productivity", "Music", "Movies", "TV"].map(
              (key) => (
                <li
                  key={key}
                  onClick={() => {
                    setCategory(key);
                    setActive(key);
                  }}
                  className={`hover:text-blue-500 w-20 cursor-pointer ${
                    active === key ? "text-[#06afff]" : ""
                  }`}
                >
                  {key}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="grid-cols-1 md:grid md:grid-cols-2 gap-15">
          {filteredBlogs.map((blog) => (
            <div
              onClick={() => {
                navigate(`/blog/${blog.id}`);
              }}
              key={blog.id}
              className="cursor-pointer hover:scale-105 transition duration-600"
            >
              <div className="h-[250px] overflow-hidden rounded-t-xl">
                <img
                  src={blog.imageUrl}
                  className="object-cover w-full"
                  alt={blog.title}
                />
              </div>

              <div className="py-2">
                <h1 className="text-lg">{blog.category}</h1>
                <p className="text-2xl font-bold mt-2">{blog.title}</p>
                <p
                  className="text-xl mt-2 text-gray-500 line-clamp-2 overflow-hidden text-ellipsis"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                ></p>
                <h4 className="text-lg mt-2">
                  {format(parseISO(blog.createdAt), "MMMM dd, yyyy")}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
