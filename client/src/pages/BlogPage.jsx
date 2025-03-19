import React, { useEffect, useState } from "react";
import HomeNav from "../components/HomeNav";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api";
import { ChevronLeft } from "lucide-react";
import { format, parseISO } from "date-fns";
import Footer from "./footer";

import "./Blog.css";

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState(null); // Changed initial state to null

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await api.getBlogById(id);
        setBlogData(response);
      } catch (err) {
        console.error("Error fetching blog data:", err);
      }
    };

    fetchBlogData();
  }, [id]);

  return (
    <>
      <HomeNav />
      <div className="px-80 pr-100 mt-10 text-white">
        <div>
          <div
            className="text-white flex items-center text-2xl cursor-pointer"
            onClick={() => navigate("/blog")}
          >
            <ChevronLeft color="white" />
            <h1 className="ml-2">All Posts</h1>
          </div>

          {blogData ? (
            <>
              <h2 className="text-4xl font-bold mt-5">{blogData.title}</h2>
              <p className="mt-2 text-xl mb-4">
                Published{" "}
                {blogData.createdAt
                  ? format(parseISO(blogData.createdAt), "MMMM dd, yyyy")
                  : "Unknown Date"}
              </p>
              <img src={blogData.imageUrl}></img>

              <div
                className="mt-5 text-xl blog-content"
                dangerouslySetInnerHTML={{ __html: blogData.content }}
              ></div>
            </>
          ) : (
            <p className="mt-5 text-xl">Loading...</p>
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default BlogPage;
