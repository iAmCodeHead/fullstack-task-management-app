import React from "react";
import { ReactNode, MouseEvent } from "react";

interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

interface AddTaskButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  style: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      type="button"
      className="tm-inline-flex tm-items-center tm-justify-center tm-h-9 tm-px-4 tm-rounded-xl tm-bg-gray-900 tm-text-gray-300 tm-hover:tm-text-white tm-text-sm tm-font-semibold tm-transition"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        fill="currentColor"
        className=""
        viewBox="0 0 16 16"
      >
        <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      </svg>
      {children}
    </button>
  );
};

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick, style, children }) => {
  return (
    <button
      type="button"
      className={`tm-inline-flex tm-items-center tm-justify-center tm-py-2 tm-px-3 tm-rounded-xl ${style} tm-transition`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export {Button, AddTaskButton}
