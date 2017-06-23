exports.up = function(knex, Promise) {
  return knex.schema.createTable('languages_users', (table) => {
      table.increments('id');
      table.integer('user_id');
      table.foreign('user_id').references('users.id');
      table.integer('language_id');
      table.foreign('language_id').references('languages.id');
      table.unique(['user_id', 'language_id']);
      table.timestamps(true,true);
    })
};

exports.down = function(knex, Promise) {
   return knex.raw("drop table languages_users cascade");
};
