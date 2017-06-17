exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('challenges_users', function(table){
      table.increments('id');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id')
      table.integer('challenge_id').unsigned();
      table.foreign('challenge_id').references('challenges.id')
    })
  ])
};

exports.down = function(knex, Promise) {
   return Promise.all([
    knex.schema.dropTable('challenges_users')
  ])
};
