import React from "react";
import LoginLogo from "../../images/LoginLogo.png";
import github from "../../images/github.png";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogIn, User } from "lucide-react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import axios from "axios";

import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  username: Yup.string()
    .required("Username is required")
    .matches(/^[a-zA-Z0-9_]{4,15}$/, "Username must be 4-15 characters long"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});
const Signup = () => {
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
    console.log("Signup with:", data);

    axios
      .post("http://localhost:5000/api/user", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Signup Response:", response.data);

        if (response.data) {
          console.log("Created user email:", response.data.email);
          toast.success("Account created successfully");
          navigate("/login");
        } else {
          alert("Signup failed! Check credentials.");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          toast.error(err.response.data.message); // Show error if email is already taken
        } else {
          toast.error("An error occurred. Please try again.");
        }
      });

    reset();
  };

  const hoverClassnames =
    "hover:text-[#00a6ff] transition-all duration-300 hover:shadow-4xl hover:shadow-blue-500 ease-in";

  const inputfieldClassnames =
    " h-12  w-full xl:text-xl focus:outline-none md:text-[14px] md:w-[55%] xl:w-[55%] bg-black border-1  border-[#454549] !pl-6 text-xl !my-2 rounded-md ";

  return (
    <div className="bg-black h-screen xl:h-screen !p-10 flex flex-col">
      <div className="flex justify-between !px-12 text-white">
        <h1
          onClick={() => {
            navigate("/");
          }}
          className={`${hoverClassnames} cursor-pointer  text-2xl font-bold`}
        >
          <ArrowLeft></ArrowLeft>
          Back to site
        </h1>
        <h1
          onClick={() => navigate("/Login")}
          className={`${hoverClassnames} cursor-pointer text-2xl font-bold`}
        >
          <User className="ml-4"></User>
          Login
        </h1>
      </div>

      <div className="h-full flex md:flex-row flex-col">
        <div className="xl:flex flex-col xl:p-20 items-center justify-center xl:h-full md:h-[80%] md:w-[40%]">
          <img className="w-full h-full" src={LoginLogo} alt="" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex  flex-1 text-white flex-col justify-center !items-center gap-2"
        >
          <div>
            <h1 className="font-extrabold text-2xl xl:text-4xl mb-2 text-center">
              Create a new account
            </h1>
            <h2 className="font-medium text-xl md:text-md text-center xl:text-xl">
              Enter your email below to create your account
            </h2>
          </div>

          <div className="mt-6 flex flex-col w-full items-center">
            <input
              className={inputfieldClassnames}
              type="text"
              placeholder="John Doe"
              {...register("username")}
            />

            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
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

            <button
              type="submit"
              className="h-12 transition-all duration-400 ease-in-out hover:bg-blue-600 font-normal text-black w-full md:w-[55%] xl:w-[55%] bg-[#00A6FF] !pl-6 text-xl !my-2 rounded-md cursor-pointer"
            >
              Sign up with Email
            </button>

            <h1 className="font-semibold text-xl mt-4 mb-4">
              OR CONTINUE WITH
            </h1>

            <button className="flex gap-1 items-center justify-center h-12 font-normal text-white w-full md:w-[55%] border-1 border-[#454549]  xl:w-[55%] transition-all ease-in-out duration-400 bg-black hover:bg-white hover:text-black !pl-6 text-xl !my-2 rounded-md cursor-pointer">
              <img src={github} className="w-8 h-8 " alt="" />
              Github
            </button>

            <p className="font-normal text-[16px] text-center  xl:w-[40%] mt-4">
              By clicking continue, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
