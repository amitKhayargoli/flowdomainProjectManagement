import React from "react";

const Header = ({
  name,
  description,
  buttonComponent,
  isSmallText = false,
}) => {
  return (
    <div className="mb-6 flex w-full h-6 items-center justify-between">
      <div>
        <h1
          className={`${
            isSmallText ? "text-2xl" : "text-2xl"
          } font-semibold dark:text-white`}
        >
          {name}
        </h1>

        <h2 className="text-lg dark:text-white">{description}</h2>
      </div>

      {buttonComponent && <div>{buttonComponent}</div>}
    </div>
  );
};

export default Header;
