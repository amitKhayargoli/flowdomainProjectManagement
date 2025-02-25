import * as React from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Camera, Mail, Trash2, X } from "lucide-react";
import pfp from "../images/pfp.jpg";
import { useForm } from "react-hook-form";
import { api } from "../api";
import { toast } from "react-toastify";
import avatar from "../images/avatar.png";

// Theme for MUI
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed  inset-0 flex h-full w-full items-center justify-center overflow-y-auto backdrop-blur-[1px] bg-black/30 bg-opacity-50 p-4">
      <div className="w-150 max-w-2xl rounded-3xl h-150 bg-white shadow-lg dark:bg-[#1d1f21] animate-float">
        <div className="">{children}</div>
      </div>
    </div>,
    document.body
  );
};

// Main Account Menu Component
export default function AccountMenu() {
  const [image, setImage] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [modalEditProfile, setModalEditProfile] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [selectedFile, setSelectedFile] = useState("");
  const open = Boolean(anchorEl);

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/auth/init", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const id = Number(response.data.data.userId);

      const responseUser = await axios.get(
        `http://localhost:5000/api/user/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(responseUser.data.data);

      setCurrentUser(responseUser.data.data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  console.log(currentUser);

  useEffect(() => {
    if (currentUser) {
      setValue("email", currentUser.email || "");
      setValue("username", currentUser.username || "");
    }
  }, [currentUser, setValue]);

  const onSubmit = async (data) => {
    console.log("Data submitted:", data);

    let imageUrl = "";

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const token = localStorage.getItem("token");
        const uploadResponse = await axios.post(
          "http://localhost:5000/api/file/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Upload Response:", uploadResponse.data);

        if (uploadResponse.data?.file?.path) {
          imageUrl = `http://localhost:5000/${uploadResponse.data.file.path}`;
        } else {
          console.error("File upload failed, no path received");
        }
      } catch (err) {
        console.error("Error uploading file:", err);
        toast.error("Failed to upload file!");
        return;
      }
    }

    const updatedUserData = {
      ...data,
      profilePictureUrl: imageUrl,
    };

    api
      .updateUser(updatedUserData)
      .then((response) => {
        console.log("Full Update User Response:", response);
        if (response) {
          toast.success("Profile updated successfully");
          fetchCurrentUser();

          setModalEditProfile(false);
        }
      })
      .catch((err) => {
        console.error("Error updating user:", err);
        toast.error(err.message);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
    setImage("");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file); // Create object URL for preview
      setImage(imageUrl);
    }
  };

  const handleDelete = async (e) => {
    const token = localStorage.getItem("token");

    await api
      .deleteAccount()
      .then((response) => {
        toast.success("Account deleted successfully");
        localStorage.removeItem("token");
        navigate("/Login");
        setImage("");
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
        toast.error(err.message);
      });
  };

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <ThemeProvider theme={darkTheme}>
      <React.Fragment>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                sx={{ width: 32, height: 32, bgcolor: "#7366ff" }}
                src={currentUser.profilePictureUrl || avatar}
                alt="Profile"
              />
            </IconButton>
          </Tooltip>
        </Box>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              bgcolor: "background.default",
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                bgcolor: "primary.main",
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              setModalEditProfile(true);
            }}
          >
            <Avatar
              sx={{ bgcolor: "#7366ff" }}
              src={currentUser.profilePictureUrl || avatar}
              alt="Profile"
            />
            {currentUser.email}
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/login");
            }}
          >
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          {/* <MenuItem
            onClick={() => {
              handleClose();
              navigate("settings");
            }}
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem> */}
          <MenuItem
            onClick={() => {
              handleClose();
              handleLogout();
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>

        {/* Edit Profile Modal */}
        <Modal
          isOpen={modalEditProfile}
          onClose={() => setModalEditProfile(false)}
        >
          <div className="flex flex-col">
            <div className="relative w-full flex justify-center h-40 bg-[#f1f1f1]  dark:bg-blue-400 rounded-t-2xl">
              <div className="absolute top-2">
                <img
                  src={currentUser.profilePictureUrl || avatar}
                  className="relative rounded-full object-cover w-60 h-60 "
                  alt=""
                />
                {/* <Camera className=" dark:text-white absolute bottom-5 right-2" /> */}
              </div>
            </div>

            <div className="border-t-1 border-[#f1f1f1] dark:border-[#b4b4b421] mt-30 p-8 ">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <div className="flex gap-2 items-center ">
                  <label
                    htmlFor="email"
                    className="block flex-1 text-sm font-bold text-gray-700 dark:text-white"
                  >
                    Email address
                  </label>
                  <div className="relative flex-2 items-center">
                    <Mail
                      width={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2  text-gray-500"
                    />
                    <input
                      type="text"
                      id="email"
                      name="email"
                      {...register("email")}
                      className="dark:text-white  pl-10 p-2 mt-1 focus:outline-none block w-full sm:text-sm border-gray-300 border rounded-md dark:border-neutral-400"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <label
                    htmlFor="name"
                    className="flex-1 block text-sm font-bold text-gray-700 dark:text-white"
                  >
                    Username
                  </label>
                  <div className="relative flex-2 items-center w-full">
                    <input
                      type="text"
                      id="name"
                      {...register("username")}
                      name="name"
                      className="p-2 dark:text-white  mt-1 focus:outline-none block w-full sm:text-sm border-gray-300 border rounded-md dark:border-neutral-400"
                      required
                    />
                  </div>
                </div>

                <div className="flex mt-2 gap-2 items-center">
                  <h1 className="flex-1 block text-sm font-bold text-gray-700 dark:text-white">
                    Profile Photo
                  </h1>

                  <div className=" flex-2 flex gap-8">
                    <img
                      src={image || currentUser.profilePictureUrl || avatar}
                      className="w-15 h-15 object-cover overflow-hidden rounded-full"
                      alt=""
                    />
                    <label
                      htmlFor="file"
                      className="font-bold px-4 py-2 h-10 mt-1  sm:text-sm border-gray-300 border-1 rounded-md dark:border-neutral-400 dark:text-white"
                    >
                      Click to replace
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      onChange={handleImageUpload}
                      className="p-2 mt-1 focus:outline-none w-full sm:text-sm border-gray-300 border-1 rounded-md dark:border-neutral-400 hidden"
                      required
                    />
                  </div>
                </div>
                <div className="py-4 px-2 flex gap-3 justify-between">
                  <button className="bg-[#eee2df] p-2 flex items-center rounded-md gap-2 cursor-pointer">
                    <Trash2 width={18} className="text-red-600"></Trash2>

                    <h1
                      className="text-md font-semibold text-red-600"
                      onClick={handleDelete}
                    >
                      Delete user
                    </h1>
                  </button>

                  <div className="flex gap-4">
                    <button className="bg-[#fff] py-2 px-6 flex items-center border-1 border-[#d8d5d5]  rounded-md gap-2 cursor-pointer">
                      <h1
                        className="text-md font-semibold text-black "
                        onClick={() => setModalEditProfile(false)}
                      >
                        Cancel
                      </h1>
                    </button>
                    <button className="bg-black text-md font-semibold text-white py-2 px-6 flex items-center rounded-md gap-2 cursor-pointer">
                      Save changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    </ThemeProvider>
  );
}
