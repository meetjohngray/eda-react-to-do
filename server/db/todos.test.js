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
  test('call db.getToDos', () => {
    return promise.then(() => {
      expect(getToDos).toHaveBeenCalled()
      return null
    })
  })
  test('returns todos', () => {
    expect.assertions(1)
    return promise.expect(200).then(res => {
      expect(res.body).toEqual(fakeToDos)
      return null
    })
  })
  describe('when database does not work', () => {
    test('returns 500', () => {
      expect.assertions(1)
      const err = new Error('horrible things')
      getToDos.mockImplementation(() => Promise.reject(err))
      return request(server).get('/v1/tasks')
        .then(res => {
          expect(res.status).toBe(500)
          return null
        })
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

describe('DELETE /v1/tasks/:id', () => {
  test('returns 400 error if id not good', () => {
    expect.assertions(3)
    const badIds = ['0', '-23', 'apple']
    const promises = badIds.map(id => expectDeleteStatusForId(id, 400))
    return Promise.all(promises)
  })
  test('return 200 if delete happens', () => {
    deleteToDo.mockImplementation(() => Promise.resolve())
    expect.assertions(1)
    return expectDeleteStatusForId(23, 200)
  })
  test('returns 500 if delete does not succeed', () => {
    const err = new Error('reasons')
    deleteToDo.mockImplementation(() => Promise.reject(err))
    expect.assertions(1)
    return expectDeleteStatusForId(23, 500)
  })
})

async function expectDeleteStatusForId (id, status) {
  const res = await request(server)
    .delete('/v1/tasks/' + id)
  expect(res.status).toBe(status)
  return null
}
