import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import AddToDo from './AddTodo'
import { addTask } from '../actions/index'
import { apiAddTask } from '../apis'

// Mock the api call, which will return an id of the newly added task
jest.mock('../apis/index', () => {
  return {
    apiAddTask: jest.fn(() => Promise.resolve(7))
  }
})

// Define the task that will be handed to the addTask action
const fakeTask = { id: 7, task: 'new task' }

// Mock the action call
const mockfakeAction = { type: 'fakeAction' }
jest.mock('../actions/index', () => ({
  addTask: jest.fn(() => mockfakeAction)
}))

// Mock the redux store
const store = {
  dispatch: jest.fn(),
  getState: jest.fn(),
  subscribe: jest.fn()
}

describe('<AddToDo />', () => {
  // What happens before each test runs
  let input
  beforeEach(() => {
    render(<Provider store={store}><AddToDo /></Provider>)
    input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'new task' } })
    fireEvent.submit(input)
  })
  test('submitting an input dispatches addTask action', () => {
    // Do I need to incluce the below?
    apiAddTask()
    expect(store.dispatch).toHaveBeenCalledWith(mockfakeAction)
    expect(addTask).toHaveBeenCalledWith(fakeTask)
  })
  test('submitting input clears input value', () => {
    expect(input.value).toBe('')
  })
})
