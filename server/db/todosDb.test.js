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

describe('Get todos', () => {
  test('Get todos from db', () => {
    expect.assertions(2)
    return db.getToDos(testDb)
      .then(todos => {
        expect(todos).toHaveLength(3)
        expect(todos[0].task).toEqual('laundry')
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

describe('delete todos', () => {
  test('deletes todos from database', () => {
    expect.assertions(2)
    return db.deleteToDo(1, testDb)
      .then(() => db.getToDos(testDb))
      .then(todos => {
        expect(todos).toHaveLength(2)
        expect(todos.map(todo => todo.id)).toEqual([2, 3])
        return null
      })
  })
})

describe('update todo in DB', () => {
  const id = 1
  const newTodo = { task: 'write tests' }

  test('updates a todo', async () => {
    expect.assertions(1)
    await db.updateToDo(id, newTodo, testDb)
    const todos = await db.getToDos(testDb)
    expect(todos.map(todo => todo.task)).toContain('write tests')
    return null
  })

  test('returns updated todo', async () => {
    expect.assertions(1)
    const oldToDo = await db.getToDos(testDb)
      .then(todos => todos.find(item => item.id === 1))
    return db.updateToDo(oldToDo.id, { task: 'new todo' }, testDb)
      .then(async () => {
        const newToDos = await db.getToDos(testDb)
        expect(newToDos.map(todo => todo.task)).toContain('new todo')
        return null
      })
  })
})
