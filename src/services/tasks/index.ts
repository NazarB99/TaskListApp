import {BASE_URL, fetchWithTimeout} from '../apiUtils';

export interface Task {
  _id?: string;
  title: string;
  description: string;
  completed: boolean;
  isImportant: boolean;
  createdAt: string;
}

export const fetchTasks = (): Promise<Task[]> => {
  return fetchWithTimeout(`${BASE_URL}/tasks`).then(res => res.json());
};

export const fetchTaskById = (id: string): Promise<Task> => {
  return fetchWithTimeout(`${BASE_URL}/tasks/${id}`).then(res => res.json());
};

export const createTask = (taskData: any): Promise<Task> => {
  return fetchWithTimeout(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  }).then(res => res.json());
};

export const deleteTask = (id: string): Promise<boolean> => {
  return fetchWithTimeout(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const updateTask = (id: string, taskData: any): Promise<Task> => {
  return fetchWithTimeout(`${BASE_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  }).then(res => res.json());
};
