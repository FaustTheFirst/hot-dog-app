export const up = knex => knex.schema.createTable('hotdogs', table => {
  table.uuid('id').notNullable().primary().defaultTo(knex.raw('gen_random_uuid()'));
  table.string('name').notNullable().unique();
  table.string('description');
  table.float('price').notNullable().defaultTo(1);
  table.string('imgURL');
  table.timestamps(true, true);
});

export const down = knex => knex.schema.dropTable('hotdogs');
