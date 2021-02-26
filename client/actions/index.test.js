import { addTask, ADD_TASK, updateTask, UPDATE_TASK } from './index'

describe('actions', () => {
  test('Is working', () => {
    const expected = 1
    const actual = 1
    expect(expected).toBe(actual)
  })

  test('should create an action to add a task', () => {
    const task = 'Write a test'
    const expectedAction = {
      type: ADD_TASK,
      task
    }
    expect(addTask(task)).toEqual(expectedAction)
  })

  test('should create an action to update a task', () => {
    const task = { id: 1, task: 'Update a test' }
    const expectedAction = {
      type: UPDATE_TASK,
      task
    }
    expect(updateTask(task)).toEqual(expectedAction)
  })
})
