export const INIT_TASK = 'INIT_TASK'
export const ADD_TASK = 'ADD_TASK'
export const DEL_TASK = 'DEL_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'

export function initTask (task) {
  return {
    type: INIT_TASK,
    task
  }
}
export function addTask (task) {
  return {
    type: ADD_TASK,
    task
  }
}

export function deleteTask (id) {
  return {
    type: DEL_TASK,
    id
  }
}

export function updateTask (task) {
  return {
    type: UPDATE_TASK,
    task
  }
}
