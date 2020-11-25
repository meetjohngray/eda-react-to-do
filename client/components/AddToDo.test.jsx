import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import { Provider } from 'react-redux'

import AddToDo from './AddTodo'
import { debug } from 'webpack'
 
const store = {
  dispatch: jest.fn(),
  getState: jest.fn(),
  subscribe: jest.fn()
}

describe('<AddToDo />', () => {
  test('submitting an input dispatches addTask action', () => {
    render(<Provider store={store}><AddToDo /></Provider>)
    let input = screen.getByRole('textbox')
    fireEvent.change(input, {target: {value: 'new task'}})
    fireEvent.submit(input)
    expect(store.dispatch).toHaveBeenCalled()
  })
})


