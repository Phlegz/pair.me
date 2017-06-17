exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('languages_users', function(table){
      table.increments('id');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id')
      table.integer('language_id').unsigned();
      table.foreign('language_id').references('languages.id')
      table.unique(['user_id', 'language_id']);
    })
  ])
};

exports.down = function(knex, Promise) {
   return knex.raw("drop table languages_users cascade")
};


