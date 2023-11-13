
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import TokenService from '../../service/TokenService';
import { TaskPriority, TaskStatus } from '../../enums/task.enum';

const apiLink =
  import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_APP_BACKEND_PROD as string
    : import.meta.env.VITE_APP_BACKEND_DEV as string;


    const userToken = TokenService.getLocalAccessToken();


interface TaskType {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  priority: TaskPriority;
}

export interface CrudApi {
  useGetTaskQuery: (id: string) => TaskType;
  // Add other endpoint methods as needed
}

export const crudApi = createApi({
 
  reducerPath: 'crudApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiLink,
    prepareHeaders: (headers: HeadersInit) => {
      const token = userToken;
    
      const updatedHeaders = new Headers(headers);
    
      if (token) {
        updatedHeaders.set('Authorization', `Bearer ${token}`);
      }
    
      return updatedHeaders;
    },
  }),
  endpoints: (builder) => ({
    getAllTasks: builder.query<TaskType, string>({
      query: (data) => ({
        url: `/task?limit=${data.limit || 10}`,
      }),
    }),
    getTask: builder.query<TaskType, string>({
      query: (id) => ({
        url: `/task/${id}`,
      }),
    }),
    getTasksOverview: builder.query({
      query: () => ({
        url: `/task/overview`,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method:'POST',
        body: { ...data },
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method:'POST',
        body: { ...data },
      }),
    }),

    createTask: builder.mutation({
      query: (data) => ({
        url: "/task",
        method:'POST',
        body: { ...data },
      }),
    }),
    updateTask: builder.mutation({
      query: (data) => ({
        url: `/task/${data.id}`,
        method:'PATCH',
        body: { 
          title: data.title,
          description: data.description,
          dueDate: data.dueDate,
          status: data.status,
          priority: data.priority, 
        },
      }),
    }),
    deleteTask: builder.mutation({
      query: (data) => ({
        url: `/task/${data.id}`,
        method:'DELETE',
      }),
    }),
  }),
  
});

// Explicitly define the type of crudApi
export const { 
  useGetAllTasksQuery, 
  useGetTaskQuery, 
  useGetTasksOverviewQuery, 
  useLoginMutation, 
  useRegisterMutation, 
  useCreateTaskMutation, 
  useUpdateTaskMutation, 
  useDeleteTaskMutation 
} = crudApi;
export type { TaskType };
export type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
export type { EndpointDefinitions } from '@reduxjs/toolkit/dist/query/endpointDefinitions';






