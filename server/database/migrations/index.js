/* eslint-disable */
export const up = knex => {
  return knex.schema.createTable('testModel', table => {
    table.uuid('id');
    table.string('name');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

export const down = knex => {
  return knex.schema.dropTable('testModel');
};
