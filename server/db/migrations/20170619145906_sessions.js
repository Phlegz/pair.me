exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('sessions', function(table){
      table.increments('id');
      table.integer('user_id');
      table.foreign('user_id').references('users.id');
      table.integer('challenge_id');
      table.foreign('challenge_id').references('challenges.id');
      table.timestamp('started_at');
      table.timestamp('stopped_at');
      table.timestamps(true,true);
    })
  ])
};

exports.down = function(knex, Promise) {
   return knex.raw("drop table sessions cascade");
};
