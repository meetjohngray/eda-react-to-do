import nock from 'nock'
import { getAllTasks, apiAddTask } from './index'

describe('getAllTasks', () => {
  const fakeBody = ['I am a todo']
  const scope = nock('http://localhost')
    .get('/v1/tasks')
    .reply(200, fakeBody)

  test('returns body of response', () => {
    return getAllTasks()
      .then((tasks) => {
        expect(tasks).toEqual(fakeBody)
        // Did I hit the api?
        expect(scope.isDone()).toBe(true)
        return null
      })
  })
})

describe('apiAddTask', () => {
  const fakeTodo = ['this is your todo']
  const fakeResponse = 3
  const scope = nock('http://localhost')
    .post('/v1/tasks', fakeTodo)
    .reply(201, fakeResponse)
   
  test('returns body of response', () => {
    return apiAddTask(fakeTodo)
      .then((response) => {
        // console.log(response)
        // expect(response).toEqual(fakeResponse)
        expect(scope.isDone()).toBe(true)
        return null
      })
  })
})
