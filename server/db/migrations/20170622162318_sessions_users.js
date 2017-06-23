exports.up = function(knex, Promise) {
  return knex.schema.createTable('sessions_users', (table) => {
      table.increments('id');
      table.integer('user_id');
      table.foreign('user_id').references('users.id');
      table.integer('session_id');
      table.foreign('session_id').references('sessions.id');
      table.timestamps(true,true);
    })
};

exports.down = function(knex, Promise) {
   return knex.raw("drop table sessions_users cascade");
};
