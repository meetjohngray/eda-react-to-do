import tasksReducer from './tasks'
import { INIT_TASK, ADD_TASK, DEL_TASK, UPDATE_TASK } from '../actions'

describe('tasks reducer', () => {
  test('sets array as initial state', () => {
    // We're giving the reducer some garbage to make the test run
    const action = { type: '_INIT_' }
    const state = tasksReducer(undefined, action)
    expect(state).toEqual([])
  })

  test('INIT_TASK', () => {
    const task = ['anything']
    const action = { type: INIT_TASK, task }
    const state = tasksReducer(undefined, action)
    expect(state).toEqual(task)
  })

  test('ADD_TASK', () => {
    const task = 'A new thing'
    const action = { type: ADD_TASK, task }
    const state = tasksReducer(['a task', 'another task'], action)
    expect(state).toHaveLength(3)
  })

  test('DEL_TASK', () => {
    const initialTasks = [{ id: 1, task: 'a task' }, { id: 4, task: 'another task' }]
    const action = { type: DEL_TASK, id: 4 }
    const state = tasksReducer(initialTasks, action)
    expect(state).toHaveLength(1)
    expect(state[0].id).toBe(1)
  })

  test('UPDATE_TASK', () => {
    const initialTasks = [{ id: 1, task: 'a task' }, { id: 4, task: 'another task' }]
    const updatedTaskId = 1
    const updatedTask = 'a different task'
    const action = { type: UPDATE_TASK, id: updatedTaskId, task: updatedTask }
    const state = tasksReducer(initialTasks, action)
    expect(state).toHaveLength(2)
    console.log(state[0])
    expect(state[0].id).toBe(1)
    expect(state[0].task).toEqual(updatedTask)
  })
})
