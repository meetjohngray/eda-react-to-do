import nock from 'nock'
import { updateTask } from '../actions'
import { getAllTasks, apiAddTask, apiDeleteTask, apiUpdateTask } from './index'

describe('getAllTasks', () => {
  const fakeBody = ['I am a todo']
  const scope = nock('http://localhost').get('/v1/tasks').reply(200, fakeBody)

  test('returns body of response', () => {
    return getAllTasks().then((tasks) => {
      expect(tasks).toEqual(fakeBody)
      // Did I hit the api?
      expect(scope.isDone()).toBe(true)
      return null
    })
  })
})

describe('apiAddTask', () => {
  const fakeTodo = ['this is your todo']
  const fakeResponse = { id: 3, task: fakeTodo }
  const scope = nock('http://localhost')
    .post('/v1/tasks', fakeTodo)
    .reply(201, fakeResponse)

  test('returns id of the new todo', () => {
    return apiAddTask(fakeTodo).then((response) => {
      expect(response).toEqual(3)
      expect(scope.isDone()).toBe(true)
      return null
    })
  })
})

describe('apiDeleteTask', () => {
  const scope = nock('http://localhost')
    .delete('/v1/tasks/3')
    .reply(200, {})

  test('sends delete request to api', () => {
    expect.assertions(1)
    return apiDeleteTask(3)
      .then(() => {
        expect(scope.isDone()).toBe(true)
        return null
      })
      .catch(console.log)
  })
})

describe('apiUpdateTask', () => {
  const updatedTaskId = 2
  const updatedTask = 'change the task'
  const scope = nock('http://localhost')
    .patch('/v1/tasks/2')
    .reply(201, 1)

  test('updates the task with the specified id', async () => {
    expect.assertions(2)
    const response = await apiUpdateTask(updatedTaskId, updatedTask)
    expect(scope.isDone()).toBe(true)
    expect(response).toEqual(1)
    return null
  })
})
