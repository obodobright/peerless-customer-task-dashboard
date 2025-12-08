import { createContext, useContext, useReducer, useEffect } from 'react'
import { taskReducer, initialState } from '../reducers/taskReducer'
import { taskService } from '../services/taskService'
import {
  FETCH_TASKS_START,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_ERROR,
  ADD_TASK_START,
  ADD_TASK_SUCCESS,
  ADD_TASK_ERROR,
  UPDATE_TASK_START,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_ERROR,
  DELETE_TASK_START,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
} from '../reducers/actionTypes'

const TaskContext = createContext()

export const useTasks = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider')
  }
  return context
}

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    dispatch({ type: FETCH_TASKS_START })
    try {
      const tasks = await taskService.getAllTasks()
      dispatch({ type: FETCH_TASKS_SUCCESS, payload: tasks })
    } catch (error) {
      dispatch({ type: FETCH_TASKS_ERROR, payload: error.message })
    }
  }

  const addTask = async (taskData) => {
    dispatch({ type: ADD_TASK_START })
    try {
      const newTask = await taskService.createTask(taskData)
      dispatch({ type: ADD_TASK_SUCCESS, payload: newTask })
      return newTask
    } catch (error) {
      dispatch({ type: ADD_TASK_ERROR, payload: error.message })
      throw error
    }
  }

  const updateTask = async (id, taskData) => {
    dispatch({ type: UPDATE_TASK_START })
    try {
      const updatedTask = await taskService.updateTask(id, taskData)
      dispatch({ type: UPDATE_TASK_SUCCESS, payload: updatedTask })
      return updatedTask
    } catch (error) {
      dispatch({ type: UPDATE_TASK_ERROR, payload: error.message })
      throw error
    }
  }

  const deleteTask = async (id) => {
    dispatch({ type: DELETE_TASK_START })
    try {
      await taskService.deleteTask(id)
      dispatch({ type: DELETE_TASK_SUCCESS, payload: id })
    } catch (error) {
      dispatch({ type: DELETE_TASK_ERROR, payload: error.message })
      throw error
    }
  }

  const value = {
    tasks: state.tasks,
    loading: state.loading,
    error: state.error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
