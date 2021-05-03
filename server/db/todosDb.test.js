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
