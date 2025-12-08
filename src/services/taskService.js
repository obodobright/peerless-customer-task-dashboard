import axios from 'axios'

const API_BASE_URL = 'http://localhost:3001'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const taskService = {
  getAllTasks: async () => {
    const response = await api.get('/tasks')
    return response.data
  },

  getTaskById: async (id) => {
    const response = await api.get(`/tasks/${id}`)
    return response.data
  },

  createTask: async (taskData) => {
    const response = await api.post('/tasks', {
      ...taskData,
      dueDate: taskData.dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    return response.data
  },

  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, {
      ...taskData,
      dueDate: taskData.dueDate || null,
      updatedAt: new Date().toISOString(),
    })
    return response.data
  },

  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}`)
    return id
  },
}
