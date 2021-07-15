import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, waitFor } from '@testing-library/react'

import TaskList from './TaskList'
import { getAllTasks } from '../apis'
import { initTask } from '../actions'

const fakeStore = {
  dispatch: jest.fn(),
  getState: jest.fn(),
  subscribe: jest.fn()
}

jest.mock('../apis', () => ({
  getAllTasks: jest.fn(() => Promise.resolve())
}))

jest.mock('../actions', () => ({
  initTask: jest.fn()
}))

fakeStore.getState.mockImplementation(() => ({
  tasks: [
    { id: 1, task: 'do a thing', completed: true },
    { id: 2, task: 'do another thing', completed: false },
    { id: 3, task: 'do more things', completed: false }
  ]
}))

describe('<TaskList />', () => {
  test('This is a test', () => expect(1 + 1).toEqual(2))
  test('loads todos from api on intial mount', async () => {
    render(<Provider store={fakeStore}><TaskList /></Provider>)
    await waitFor(() => {
      return getAllTasks.mock.calls.length > 1
    })
    expect(fakeStore.dispatch).toHaveBeenCalled()
    expect(initTask).toHaveBeenCalled()
  })
  test('Lists out todos from redux', async () => {
    render(<Provider store={fakeStore}><TaskList /></Provider>)
    const items = await screen.findAllByRole('listitem')
    expect(items).toHaveLength(6)
  })
})
