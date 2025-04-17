import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "../../types";
import * as api from "../../service/api";

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};


  export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, { rejectWithValue }) => {
    try {
      const response = await api.fetchTasks();
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch tasks";
      return rejectWithValue(errorMessage);
    }
  });
  
  export const createTask = createAsyncThunk("tasks/createTask", async (task: Task, { rejectWithValue }) => {
    try {
      const response = await api.createTask(task);
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create task";
      return rejectWithValue(errorMessage);
    }
  });
  
  export const updateTask = createAsyncThunk("tasks/updateTask", async (task: Task, {rejectWithValue }) => {
    try {
      const response = await api.updateTask(task);
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update task";
      return rejectWithValue(errorMessage);
    }
  });
  
  export const deleteTask = createAsyncThunk("tasks/deleteTask", async (taskId: string, { rejectWithValue }) => {
    try {
      await api.deleteTask(taskId);
      return taskId;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete task";
      return rejectWithValue(errorMessage);
    }
  });

  export const reorderTasks = createAsyncThunk(
    "tasks/reorderTasks", 
    async (reorderedTasks: Task[], { rejectWithValue }) => {
      try {
        const responses = await Promise.all(
          reorderedTasks.map(task => api.updateTask(task))
        );
        return responses;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to reorder tasks";
        return rejectWithValue(errorMessage);
      }
    }
  );


 const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTasks.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
          state.loading = false;
          state.tasks = action.payload;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(createTask.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createTask.fulfilled, (state, action) => {
          state.loading = false;
          state.tasks.push(action.payload);
        })
        .addCase(createTask.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(updateTask.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateTask.fulfilled, (state, action) => {
          state.loading = false;
          const index = state.tasks.findIndex((t) => t.id === action.payload.id);
          if (index !== -1) state.tasks[index] = action.payload;
        })
        .addCase(updateTask.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(deleteTask.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
          state.loading = false;
          state.tasks = state.tasks.filter((t) => t.id !== action.payload);
        })
        .addCase(deleteTask.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(reorderTasks.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(reorderTasks.fulfilled, (state, action) => {
          state.loading = false;
          action.payload.forEach(updatedTask => {
            const index = state.tasks.findIndex(t => t.id === updatedTask.id);
            if (index !== -1) {
              state.tasks[index] = updatedTask;
            }
          });
        })
        .addCase(reorderTasks.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
})


export default tasksSlice.reducer

export const selectTasks = (state: { tasks: TasksState }) => state.tasks