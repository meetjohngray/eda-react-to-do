exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('toDos').del()
    .then(function () {
      // Inserts seed entries
      return knex('toDos').insert([
        { id: 1, task: 'laundry', priority: 'low', details: 'need clean underwear', isComplete: false },
        { id: 2, task: 'dishes', priority: 'high', details: 'things are growing...', isComplete: false },
        { id: 3, task: 'homework', priority: 'medium', details: 'due tomorrow', isComplete: false }
      ])
    })
}
