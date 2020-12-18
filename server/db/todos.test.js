import request from 'supertest'
import server from '../server'
import { addToDo, deleteToDo, updateTodo, getToDos } from './todos'

jest.mock('./todos', () => ({
  addToDo: jest.fn(),
  deleteToDo: jest.fn(),
  updateToDo: jest.fn(),
  getToDos: jest.fn()
}))

describe('getToDos', () => {
  const fakeToDos = [{ task: 'thing' }, { task: 'another thing' }]
  beforeAll(() => {
    getToDos.mockImplementation(() => Promise.resolve(fakeToDos))
    promise = request(server)
      .get('/v1/tasks')
  })
  test('returns todos', () => {
    expect.assertions(1)
    return promise.then(res => {
      expect(res.body).toEqual(fakeToDos)
      return null
    })
  })
})

let promise
describe('POST /v1/tasks', () => {
  const fakeToDo = {
    id: 1,
    task: 'do things',
    priority: null,
    isComplete: false
  }

  beforeAll(() => {
    addToDo.mockImplementation(() => Promise.resolve(fakeToDo))
    promise = request(server)
      .post('/v1/tasks')
      .send({ task: 'new task' })
  })
  test('returns a 201', () => {
    expect.assertions(1)
    return promise.then(res => {
      expect(res.status).toBe(201)
      return null
    })
  })
  test('calls addToDo from database', () => {
    expect.assertions(1)
    return promise.then(res => {
      // console.log(res.body)
      expect(addToDo).toHaveBeenCalled()
      // ## How to get the below working?
      // expect(addToDo).toHaveBeenCalledWith('new task')
      return null
    })
  })
})
