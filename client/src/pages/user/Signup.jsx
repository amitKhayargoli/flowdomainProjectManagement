import React from "react";
import LoginLogo from "../../images/LoginLogo.png";
import github from "../../images/github.png";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogIn, User } from "lucide-react";
const Signup = () => {
  const navigate = useNavigate();
  const hoverClassnames =
    "hover:text-[#00a6ff] transition-all duration-300 hover:shadow-4xl hover:shadow-blue-500 ease-in";

  const inputfieldClassnames =
    " h-12  w-full xl:text-xl md:text-[14px] md:w-[55%] xl:w-[55%] bg-black border-1  border-[#454549] !pl-6 text-xl !my-2 rounded-md ";

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

        <div className="flex  flex-1 text-white flex-col justify-center !items-center gap-2">
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
              placeholder="name@example.com"
            />
            <input
              className={inputfieldClassnames}
              type="password"
              placeholder="*************"
            />

            <button className="h-12 transition-all duration-400 ease-in-out hover:bg-blue-600 font-normal text-black w-full md:w-[55%] xl:w-[55%] bg-[#00A6FF] !pl-6 text-xl !my-2 rounded-md cursor-pointer">
              Sign up with Email
            </button>

            <h1 className="font-semibold text-xl mt-4 mb-4">
              OR CONTINUE WITH
            </h1>

            <button className="flex gap-1 items-center justify-center h-12 font-normal text-white w-full md:w-[55%] border-1 border-[#454549]  xl:w-[55%] transition-all ease-in-out duration-400 bg-black hover:bg-white hover:text-black !pl-6 text-xl !my-2 rounded-md cursor-pointer">
              <img src={github} className="w-8 h-8" alt="" />
              Github
            </button>

            <p className="font-normal text-[16px] text-center  xl:w-[40%] mt-4">
              By clicking continue, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
