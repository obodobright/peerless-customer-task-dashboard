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
} from './actionTypes'

export const initialState = {
  tasks: [],
  loading: false,
  error: null,
}

export const taskReducer = (state, action) => {
  switch (action.type) {
    case FETCH_TASKS_START:
    case ADD_TASK_START:
    case UPDATE_TASK_START:
    case DELETE_TASK_START:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: null,
      }

    case ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        loading: false,
        error: null,
      }

    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        loading: false,
        error: null,
      }

    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        loading: false,
        error: null,
      }

    case FETCH_TASKS_ERROR:
    case ADD_TASK_ERROR:
    case UPDATE_TASK_ERROR:
    case DELETE_TASK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
