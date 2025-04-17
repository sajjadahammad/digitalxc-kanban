import axios from 'axios';
import { Task } from '../types';


const API_URL = 'http://localhost:3001/tasks';

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (task: Task): Promise<Task> => {
  try {
    const response = await axios.post(API_URL, task);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};
export const updateTask = async (task: Task): Promise<Task> => {
  try {
    const response = await axios.put(`${API_URL}/${task.id}`, task);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${taskId}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};