import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header";

import { X } from "lucide-react";

const Modal = ({ children, isOpen, onClose, name }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex h-full w-full items-center justify-center overflow-y-auto backdrop-blur-[1px] bg-black/30 bg-opacity-50 p-4 ">
      <div className="w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg dark:bg-[#1d1f21] animate-float">
        <Header
          name={name}
          buttonComponent={
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600  text-white"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          }
        />
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
