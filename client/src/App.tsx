
import { Route, Routes} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login'
import SignUp from './pages/SignUp'
//import Home from './pages/Home'
import OverView from './pages/OverView';
import AllTasks from './pages/AllTasks';
import SingleTask from './pages/SingleTask';
function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/' element={<OverView/>} />
        <Route path='/tasks' element={<AllTasks/>} />
        <Route path='/tasks/:taskId' element={<SingleTask/>} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App
