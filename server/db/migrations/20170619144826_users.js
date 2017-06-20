exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
      table.increments('id');
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('github_username').notNullable();
      table.string('access_token');
      table.string('avatar');
      table.timestamps(true,true);
    })
};

exports.down = function(knex, Promise) {
   return knex.raw("drop table users cascade");
};
