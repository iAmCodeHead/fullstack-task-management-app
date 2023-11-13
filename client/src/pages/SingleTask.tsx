import React, { useEffect, useState } from "react";
import { TaskList } from "../component/TaskOverView";
import SideBar from '../component/SideBar';
import { useDeleteTaskMutation, useGetTaskQuery, useUpdateTaskMutation } from '../redux/api/apiSlice';
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTask } from "../redux/features/tasks/taskSlice";
import DisplayMessage from "../component/MessageBanner";
import Modal from "../component/Modal";
import { AddTaskButton } from "../component/Button";

const  SingleTask: React.FC = () => {
    const { taskId } = useParams<{ taskId: string }>();
    const {data, error, isLoading} = useGetTaskQuery(taskId);
    const dispatch = useDispatch();

    const [isModalOpen, setModalOpen] = useState(false);

    const [isError, setError] = useState('');
    const [isTask, setTask] = useState(data);
    const [updateTask] = useUpdateTaskMutation()
    const [deleteTask] = useDeleteTaskMutation()

    useEffect(()=>{
        !isLoading && data && dispatch(getTask(data));
        setTask(data);
     },  [dispatch, data, isLoading] );

     const openModal = () => {
        setModalOpen(true);
      };
  
      const closeModal = () => {
        setModalOpen(false);
      };

      const saveData = async (formData: any) => {
  
        try {
            const response = await updateTask({ id: taskId, ...formData });  
            const {error} = response;
          if(error) {
            const message = error?.message || error?.data?.message || 'Error encountered';
            setError(message);
          } else {
            setTask(formData);
            closeModal();
          }
          
        } catch (err) {
          const message = err?.message || err?.data?.message || 'Error encountered';
          setError(message);
        }
  
      };

      const handleDelete = async () => {
        try {
            const response = await deleteTask({ id: taskId });  
            const {error} = response;
          if(error) {
            const message = error?.message || error?.data?.message || 'Error encountered';
            setError(message);
          } else {
            setTask('');
            closeModal();
          }
          
        } catch (err) {
          const message = err?.message || err?.data?.message || 'Error encountered';
          setError(message);
        }
      }

    return (
        <>
            <SideBar />
            <div className="tm-ml-60 tm-pt-16 tm-max-h-screen tm-overflow-auto">
                <div className="tm-px-6 tm-py-8">
                    <div className="tm-max-w-4xl tm-mx-auto">
                        <div className="tm-bg-white tm-rounded-3xl tm-p-8 tm-mb-5">
                            <div className="tm-flex tm-items-center tm-justify-between"></div>
                            <h1 className="tm-text-xl tm-font-bold tm-leading-none tm-text-center">
                                {isTask && isTask.title}
                            </h1>
                            <hr className="tm-my-10" />
                            {isTask &&<div className="tm-flex tm-justify-between">
                                <div className="tm-mt-5">
                                    <AddTaskButton 
                                    onClick={openModal}
                                    style="tm-bg-white tm-text-gray-800 hover:tm-text-green-500 tm-text-sm tm-font-semibold">
                                        Edit Task
                                    </AddTaskButton>
                                </div>
                                <div className="tm-mt-5">
                                    <AddTaskButton 
                                    onClick={handleDelete}
                                    style="tm-bg-white tm-text-red-800 hover:tm-text-red-200 tm-text-sm tm-font-semibold">
                                        Delete Task
                                    </AddTaskButton>
                                </div>
                            </div>}
                            <div>
                                {isTask && <Modal
                                    isOpen={isModalOpen}
                                    onClose={closeModal}
                                    onSave={saveData}
                                    data={isTask}
                                    >
                                    <div>
                                        <h2 className="text-2xl font-bold mb-4 tm-text-center">
                                        Edit Task
                                        </h2>
                                        {/* Your other content goes here */}
                                        {isError !== '' && <DisplayMessage bgColor={"tm-bg-red-100"} message={isError}/>}
                                    </div>
                                </Modal>}
                            </div>
                            <div className="tm-space-y-4">
                                {isTask && <div key={isTask.id}>
                                    <TaskList
                                    id={isTask.id}
                                    title={isTask.title}
                                    dueDate={isTask.dueDate}
                                    status={isTask.status}
                                    description={isTask.description}
                                    priority={isTask.priority}
                                    showDescription={true} />
                                </div>}

                                {!isTask && <h1 className="tm-space-y-4 tm-text-center">This task seem to have been deleted!</h1>}
                            </div>
                            </div>
                        </div>
                    </div>
              </div>
        </>
    )
}

export default SingleTask