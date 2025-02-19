import React from "react";
import LoginLogo from "../../images/LoginLogo.png";
import github from "../../images/github.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft, User } from "lucide-react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios"; // Add this import
import { toast } from "react-toastify";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    console.log("Login btn clicked");

    console.log("Logging in with:", data);

    axios
      .post("http://localhost:5000/api/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Login Response:", response.data.data.access_token);

        if (response.data && response.data.data.access_token) {
          console.log("Access Token:", response.data.data.access_token);
          localStorage.setItem("token", response.data.data.access_token);

          localStorage.setItem("role", response.data.data.role);
          localStorage.setItem("userId", response.data.data.userId);

          console.log(response.data.data.role);
          if (response.data.data.role === "user") {
            navigate("/workspace");
            toast.success("Logged into Workspace");
          } else if (response.data.data.role === "admin") {
            navigate("/Admin/");
            toast.success("Logged as Admin");
          }
        } else {
          alert("Login failed! Check credentials.");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert("Error logging in. Please try again.");
      });

    reset();
  };

  const hoverClassnames =
    "hover:text-[#00a6ff] transition-all duration-300 hover:shadow-4xl hover:shadow-blue-500 ease-in";

  const inputfieldClassnames =
    "h-12 w-full xl:text-xl md:text-[14px] md:w-[55%] xl:w-[55%] bg-black border-1 border-[#454549] !pl-6 text-xl !my-2 rounded-md focus:outline-none";

  return (
    <div className="bg-black h-screen xl:h-screen !p-10 flex flex-col">
      <div className="flex justify-between !px-12 text-white">
        <h1
          onClick={() => {
            navigate("/");
          }}
          className={`${hoverClassnames} cursor-pointer text-2xl font-bold`}
        >
          <ArrowLeft />
          Back to site
        </h1>
        <h1
          onClick={() => navigate("/Signup")}
          className={`${hoverClassnames} cursor-pointer text-2xl font-bold`}
        >
          <User className="ml-7" />
          Signup
        </h1>
      </div>

      <div className="h-full flex md:flex-row flex-col">
        <div className="xl:flex flex-col xl:p-20 items-center justify-center xl:h-full md:h-[80%] md:w-[40%]">
          <img className="w-full h-full" src={LoginLogo} alt="" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 text-white flex-col justify-center !items-center gap-2"
        >
          <div>
            <h1 className="font-extrabold text-2xl xl:text-4xl mb-2 text-center">
              Login to your workspace
            </h1>
            <h2 className="font-medium text-xl md:text-md text-center xl:text-xl">
              Continue with your credentials
            </h2>
          </div>

          <div className="mt-6 flex flex-col w-full items-center">
            <input
              className={inputfieldClassnames}
              type="text"
              placeholder="name@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <input
              className={inputfieldClassnames}
              type="password"
              placeholder="*************"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <button className="h-12 transition-all duration-400 ease-in-out hover:bg-blue-600 font-normal text-black w-full md:w-[55%] xl:w-[55%] bg-[#00A6FF] !pl-6 text-xl !my-2 rounded-md cursor-pointer">
              Log in with Email
            </button>

            <h1 className="font-semibold text-xl mt-4 mb-4">
              OR CONTINUE WITH
            </h1>

            {/* <button className="flex gap-1 items-center justify-center h-12 font-normal text-white w-full md:w-[55%] border-1 border-[#454549] xl:w-[55%] transition-all ease-in-out duration-400 bg-black hover:bg-white hover:text-black !pl-6 text-xl !my-2 rounded-md cursor-pointer">
              <img src={github} className="w-8 h-8" alt="Github" />
              Github
            </button> */}

            <p className="font-normal text-[16px] text-center xl:w-[40%] mt-4">
              By clicking continue, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
