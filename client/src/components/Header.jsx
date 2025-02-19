import React from "react";

const Header = ({ name, buttonComponent, isSmallText = false }) => {
  return (
    <div className="mb-6 flex w-full h-6 items-center justify-between">
      <h1
        className={`${
          isSmallText ? "text-2xl" : "text-2xl"
        } font-semibold dark:text-white`}
      >
        {name}
      </h1>
      {buttonComponent && <div>{buttonComponent}</div>}
    </div>
  );
};

export default Header;
