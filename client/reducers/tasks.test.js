import tasksReducer from './tasks'
import { INIT_TASK, ADD_TASK } from '../actions'

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
})
