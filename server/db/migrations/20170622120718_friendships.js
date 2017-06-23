exports.up = function(knex, Promise) {
  return knex.schema.createTable('friendships', (table) => {
      table.increments('id');
      table.timestamp('requested_at').notNullable();
      table.timestamp('responded_at');
      table.string('status').notNullable().defaultTo("pending");
      table.timestamps(true,true);
    })
};

exports.down = function(knex, Promise) {
   return knex.raw("drop table friendships cascade");
};
