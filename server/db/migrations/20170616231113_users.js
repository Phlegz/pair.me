exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table){
      table.increments('id');
      table.string('github_login')
      table.string('github_avatar');
      table.string('github_name')
      table.integer('github_id')
      table.string('github_token');

    })
  ])
};

exports.down = function(knex, Promise) {
   return knex.raw("drop table users cascade");
};


