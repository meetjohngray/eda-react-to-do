const knex = require('knex')
const config = require('./knexfile')
const testDb = knex(config.test)

const db = require('./todos')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

describe('Get to todos', () => {
  test('Get todos from db', () => {
    expect.assertions(2)
    return db.getToDos(testDb)
      .then(tasks => {
        expect(tasks).toHaveLength(3)
        expect(tasks[0].task).toEqual('laundry')
        return null
      })
  })
})

describe('addTodo', () => {
  test('saves todo into database', () => {
    expect.assertions(2)
    const task = { task: 'new task' }
    return db.addToDo(task, testDb)
      .then(() => {
        return testDb('toDos').select()
      }).then(todos => {
        expect(todos).toHaveLength(4)
        expect(todos[3].task).toEqual('new task')
        return null
      })
  })
})
