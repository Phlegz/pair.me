
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notifications', (table) => {
      table.increments('id');
      table.integer('user_id');
      table.foreign('user_id').references('users.id');
      // table.integer('session_id');
      // table.foreign('session_id').references('sessions.id');
      table.boolean('initiator');
      table.boolean('status'); //accepted,rejected,ignored
      table.timestamps(true,true);
    })
};

exports.down = function(knex, Promise) {
   return knex.raw("drop table notifications cascade");
};
