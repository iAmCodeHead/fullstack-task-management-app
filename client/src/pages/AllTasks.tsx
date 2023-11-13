import React, { useEffect } from "react";
import { TaskList } from "../component/TaskOverView";
import SideBar from '../component/SideBar';
import { useGetAllTasksQuery } from '../redux/api/apiSlice';
import { getAllTasks } from '../redux/features/tasks/taskSlice';
import { useDispatch } from "react-redux";

const  AllTasks: React.FC = () => {

    const {data, error, isLoading} = useGetAllTasksQuery('title');
    const dispatch = useDispatch();

    useEffect(()=>{
        !isLoading && data && dispatch(getAllTasks(data.results));
  
     },  [dispatch, data, isLoading] );

    return (
        <>
            <SideBar />
            <div className="tm-ml-60 tm-pt-16 tm-max-h-screen tm-overflow-auto">
                <div className="tm-px-6 tm-py-8">
                    <div className="tm-max-w-4xl tm-mx-auto">
                        <div className="tm-bg-white tm-rounded-3xl tm-p-8 tm-mb-5">
                            <div className="tm-flex tm-items-center tm-justify-between"></div>
                            <h1 className="tm-text-xl tm-font-bold tm-leading-none tm-text-center">
                                THM <span className="tm-text-yellow-700">Task Manager</span> (All Tasks)
                            </h1>
                            <hr className="tm-my-10" />

                            <div className="tm-space-y-4">
                            {data && data.results.map((task) => (
                                <div key={task.id}>
                                    <TaskList
                                    id={task.id}
                                    title={task.title}
                                    dueDate={task.dueDate}
                                    assignTo={"james"}
                                    status={task.status}
                                    description={task.description}
                                    priority={task.priority}
                                    showDescription={false}
                                     />
                                </div>
                            ))}
                            </div>
                            </div>
                        </div>
                    </div>
              </div>
        </>
    )
}

export default AllTasks