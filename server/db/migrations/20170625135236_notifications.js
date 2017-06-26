
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notifications', (table) => {
      table.increments('id');
      table.integer('user_id');
      table.foreign('user_id').references('users.id');
      table.boolean('initiator');
      table.string('status').defaultTo('pending'); //accepted,rejected,ignored
      table.timestamps(true,true);
    })
};

exports.down = function(knex, Promise) {
   return knex.raw("drop table notifications cascade");
};
