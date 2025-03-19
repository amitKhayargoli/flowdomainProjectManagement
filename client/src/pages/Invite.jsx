import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import invite from "../images/invite2.png";
import HomeNav from "../components/HomeNav";
import { toast } from "react-toastify";
const JoinProject = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("InviteToken", token);

      const userToken = localStorage.getItem("token");

      if (!userToken) {
        navigate("/login");
      } else {
        joinProject(token, userToken);
      }
    } else {
      setError("No token found in the URL.");
    }
  }, [location]);

  const joinProject = async (inviteToken, authToken) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/invite?token=${inviteToken}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      setMessage(response.data.message);
      localStorage.setItem("joinedProject", "true");
      localStorage.removeItem("InviteToken");

      setTimeout(() => {
        navigate("/workspace/projects");
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred";

      if (errorMessage === "User already a member of the project") {
        navigate("/workspace/projects");
      } else {
        setError(errorMessage);
      }
    }
  };

  return (
    <div>
      <HomeNav />
      <div className="mt-8 px-30">
        <h1 className="text-2xl md:text-6xl font-bold text-white text-center mb-10">
          Accepting Invitation
        </h1>
        <img src={invite} alt="" />
      </div>
    </div>
  );
};

export default JoinProject;
