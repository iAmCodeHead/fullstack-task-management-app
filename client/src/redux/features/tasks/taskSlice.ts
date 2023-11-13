import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  tasks: [],
  task: {}
};

const tasksSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
   getAllTasks: (state, {payload}) =>{
    state.tasks = payload
   },
   getTask: (state, {payload}) =>{
    state.task = payload
   },
  },
});


export const { getAllTasks, getTask } = tasksSlice.actions;

export default tasksSlice.reducer;


