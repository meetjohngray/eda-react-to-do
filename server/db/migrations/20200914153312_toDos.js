
exports.up = function (knex) {
  return knex.schema.createTable("toDos", (table) => {
    table.increments("id").primary();
    table.string("task");
    table.string("priority");
    table.string("details");
    table.boolean("isComplete");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("toDos");
};