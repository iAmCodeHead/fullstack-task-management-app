import React from "react";
import { AddTaskButton } from "./Button";
import { Link } from "react-router-dom";
import { Task } from "../interfaces/task.interface";

interface CardProps {
  tasksNumber: number | string;
  tasksText: string
  bgColor: string;
}

interface GreetingCardProps{
  userName: string;
  handleAddTask: () => void;
}

const TaskOverView: React.FC<CardProps> = ({ tasksNumber, tasksText, bgColor }) => {
  return (
    <>
      <div className={`tm-p-4 tm-rounded-xl tm-text-gray-800 ${bgColor} `}>
        <div className="tm-font-bold tm-text-2xl tm-leading-none">{tasksNumber}</div>
        <div className="tm-mt-2">{tasksText}</div>
      </div>
    </>
  );
};

const GreetingCard: React.FC<GreetingCardProps> = ({ userName, handleAddTask }) => {
  return (
      <div className="tm-col-span-2">
        <div className="tm-p-4 tm-bg-green-100 tm-rounded-xl">
          <div className="tm-font-bold tm-text-xl tm-text-gray-800 tm-leading-none">
            Good day, <br />
            {userName}
          </div>
          <div className="tm-mt-5">
            <AddTaskButton 
            onClick={handleAddTask}
            style="tm-bg-white tm-text-gray-800 hover:tm-text-green-500 tm-text-sm tm-font-semibold"
            >Add New Task</AddTaskButton>
          </div>
        </div>
      </div>
   
  );
}

const TaskList: React.FC<Task> = ({id, title, dueDate, status, description, priority, showDescription}) => {
  return (
    <div className="tm-p-4 tm-bg-white tm-border tm-rounded-xl tm-text-gray-800 tm-space-y-2">
      <div className="tm-flex tm-justify-between">
        {/* This could be handle better using dynamic styling */}
        {status === 'todo' && <div className='tm-text-gray-600 tm-text-xs tm-bg-blue-200 tm-rounded-lg tm-p-1'>{status}</div>}
        {status === 'in-progress' && <div className='tm-text-gray-600 tm-text-xs tm-bg-gray-200 tm-rounded-lg tm-p-1'>{status}</div>}
        {status === 'done' && <div className='tm-text-gray-600 tm-text-xs tm-bg-green-200 tm-rounded-lg tm-p-1'>{status}</div>}

        {priority === 'low' && <div className='tm-text-gray-600 tm-text-xs tm-bg-blue-200 tm-rounded-lg tm-p-1'>{priority}</div>}
        {priority === 'medium' && <div className='tm-text-gray-600 tm-text-xs tm-bg-yellow-200 tm-rounded-lg tm-p-1'>{priority}</div>}
        {priority === 'high' && <div className='tm-text-gray-600 tm-text-xs tm-bg-red-200 tm-rounded-lg tm-p-1'>{priority}</div>}
      </div>
      <Link to={`/tasks/${id}`} className="tm-font-bold hover:tm-text-yellow-800 hover:tm-underline">
        {title}
      </Link>
      <p className={showDescription ? "tm-text-xs" : "tm-hidden"}>{description}</p>
      <div className="tm-text-sm tm-text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          fill="currentColor"
          className="text-gray-800 inline align-middle mr-1"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
        </svg>
       {` Deadline is ${new Date(dueDate).toDateString()}`}
      </div>
    </div>
  );
}

export { TaskOverView, GreetingCard, TaskList}
