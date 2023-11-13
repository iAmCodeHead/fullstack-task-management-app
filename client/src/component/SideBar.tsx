import React from "react";
import {Button} from "./Button";
import { SvgOverViewIcon } from "../assets/OverViewSvgIcon";
import { SvgTaskListIcon } from "../assets/TaskListSvgIcon";
import { Link, NavLink } from "react-router-dom";

const SideBar: React.FC = () => {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  const listItems = [
    {
      icon: <SvgOverViewIcon />,
      text: "Overview",
      className: "tm-bg-yellow-200 tm-text-yellow-900",
      route: "/"
    },
    {
      icon: <SvgTaskListIcon />,
      text: "Task list",
      className: "tm-bg-white hover:tm-bg-yellow-50 tm-text-gray-900",
      route: "/tasks"
    },
  ];
  return (
    <>
      <div className="tm-relative tm-bg-yellow-50 tm-overflow-hidden tm-max-h-screen">
        <aside className="tm-fixed tm-inset-y-0 tm-left-0 tm-bg-white tm-shadow-md tm-max-h-screen tm-w-60">
          <div className="tm-flex tm-flex-col tm-justify-between tm-h-full">
            <div className="tm-flex-grow">
              <div className="tm-px-4 tm-py-6 tm-text-center tm-border-b">
                <h1 className="tm-text-xl tm-font-bold tm-leading-none">
                THM <span className="tm-text-yellow-700">Task Manager</span>
                </h1>
              </div>
              <div className="tm-p-4">
                <ul className="tm-space-y-1">
                  {listItems.map((item, index) => (
                    <li
                      key={index}
                      className={`tm-flex tm-items-center tm-rounded-xl tm-font-bold tm-text-sm tm-py-3 tm-px-4 ${item.className}`}
                    >
                      <NavLink to={item.route}>
                        {item.icon}
                        {item.text}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="tm-p-4">
            <Button onClick={handleClick}> Logout</Button>
          </div>
        </aside>
      </div>
    </>
  );
};

export default SideBar;
