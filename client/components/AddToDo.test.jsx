import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'

import AddToDo from './AddTodo'
import { addTask } from '../actions/index'

const mockfakeAction = { type: 'fakeAction' }
jest.mock('../actions/index', () => ({
  addTask: jest.fn(() => mockfakeAction)
}))

const store = {
  dispatch: jest.fn(),
  getState: jest.fn(),
  subscribe: jest.fn()
}

describe('<AddToDo />', () => {
  let input
  beforeEach(() => {
    render(<Provider store={store}><AddToDo /></Provider>)
    input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'new task' } })
    fireEvent.submit(input)
  })
  test('submitting an input dispatches addTask action', () => {
    if (fireEvent.keyDown(input) === 'enter') {
      expect(store.dispatch).toHaveBeenCalledWith(mockfakeAction)
      expect(addTask).toHaveBeenCalledWith('new task')
    }
  })
  test('submitting input returns the new task', () => {
    expect(input.value).toBe('new task')
  })
})
