import React, { useEffect, useState } from "react";
import {
  GreetingCard,
  TaskList,
  TaskOverView,
} from "../component/TaskOverView";
import Modal from "../component/Modal";
import { useCreateTaskMutation, useGetAllTasksQuery, useGetTasksOverviewQuery } from "../redux/api/apiSlice";
import DisplayMessage from "../component/MessageBanner";
import { useDispatch } from "react-redux";
import { getAllTasks } from "../redux/features/tasks/taskSlice";
import { Task } from "../interfaces/task.interface";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {

  const navigate = useNavigate();

    const [isModalOpen, setModalOpen] = useState(false);
    const [isError, setError] = useState('');
    const [tasks, setTask] = useState([]);

    const { user } = useSelector((state: RootState) => state.auth );

    if(!user) {
      navigate('/login')
    }

    const {data, error, isLoading} = useGetAllTasksQuery({limit: 3});
    // const {fetchTasksOverview} = useGetTasksOverviewQuery('');
    const [createTask, {error: isCreateError, isLoading: isCreateLoading}] = useCreateTaskMutation();
    const tasksOverviewResponse = useGetTasksOverviewQuery();
    const tasksOverview = tasksOverviewResponse.data;
    const dispatch = useDispatch();

    const formData = {
      title: '',
      description: '',
      dueDate: '',
      status: '',
      priority: '',
    }

    useEffect(()=>{


      !isLoading && data && dispatch(getAllTasks(data.results));
      setTask(data);
   },  [dispatch, data, isLoading] )

    const openModal = () => {
      setModalOpen(true);
    };

    const closeModal = () => {
      setModalOpen(false);
    };
    const saveData = async (formData: Task) => {

      try {
        const response = await createTask(formData).unwrap();

        if(response) {
          setTask(data);
          closeModal();
        }
        
      } catch (err) {
        const message = err?.message || err?.data?.message || 'Error encountered';
        setError(message);
        console.error('Unknown error:', err?.data?.message);
      }

    };

  return (
    <>
      <div className="tm-ml-60 tm-pt-16 tm-max-h-screen tm-overflow-auto">
        <div className="tm-px-6 tm-py-8">
          <div className="tm-max-w-4xl tm-mx-auto">
            <div className="tm-bg-white tm-rounded-3xl tm-p-8 tm-mb-5">
              <div className="tm-flex tm-items-center tm-justify-between"></div>

              <hr className="tm-my-10" />

              <div className="tm-grid tm-grid-cols-2 tm-gap-x-20">
                <div>
                  <h2 className="tm-text-2xl tm-font-bold tm-mb-4">Stats</h2>

                  <div className="tm-grid tm-grid-cols-2 tm-gap-4">
                    <GreetingCard
                      userName={user && user.username}
                      handleAddTask={openModal}
                    />
                    
                    <Modal
                      isOpen={isModalOpen}
                      onClose={closeModal}
                      onSave={saveData}
                      data={formData}
                    >
                      <div>
                        <h2 className="text-2xl font-bold mb-4 tm-text-center">
                          Create New Task
                        </h2>
                        {/* Your other content goes here */}
                        {isError !== '' && <DisplayMessage bgColor={"tm-bg-red-100"} message={isError}/>}
                      </div>
                    </Modal>

                    <TaskOverView
                      tasksNumber={tasksOverview?.totalFinishedTasks ?? '-'}
                      tasksText={"Tasks finished"}
                      bgColor={"tm-bg-yellow-100"}
                    />

                    <TaskOverView
                      tasksNumber={tasksOverview?.totalTasksInTodo ?? '-'}
                      tasksText={"Tasks in your todo"}
                      bgColor={"tm-bg-yellow-100"}
                    />

                    <div className="tm-col-span-2">
                      <TaskOverView
                        tasksNumber={"Your daily plan"}
                        tasksText={`${tasksOverview?.daily?.completedTodaysTasks ?? '-'} of ${tasksOverview?.daily?.todaysTasks ?? '-'} completed`}
                        bgColor={"tm-bg-purple-100"}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="tm-text-2xl tm-font-bold mb-4">
                    Your tasks today
                  </h2>
                  <div className="tm-space-y-4">
                  {data && data.results.map((task) => (
                    <div key={task.id}>
                        <TaskList
                          id={task.id}
                          title={task.title}
                          dueDate={task.dueDate}
                          status={task.status}
                          description={task.description}
                          priority={task.priority}
                          showDescription={false} />
                      </div>
                  ))}
                  {!data || data.results == 0 && <h1 className="tm-text-gray-600 tm-text-xs">
                    You don't seem to have a lot going on at the moment
                    </h1>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
