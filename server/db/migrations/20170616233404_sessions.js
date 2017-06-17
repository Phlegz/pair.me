exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('sessions', function(table){
      table.increments('id');
      table.integer('user1_id').unsigned();
      table.foreign('user1_id').references('users.id');
      table.integer('user2_id').unsigned();
      table.foreign('user2_id').references('users.id');
      table.integer('challenge_id').unsigned();
      table.foreign('challenge_id').references('challenges.id');
    })
  ])
};

exports.down = function(knex, Promise) {
   return knex.raw("drop table sessions cascade");
};
