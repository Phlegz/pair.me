exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('users', function(table){
      table.string('name').alter();
      table.string('email').alter();
      table.integer('github_id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('users', function(table){
      table.string('name').notNullable().alter();
      table.string('email').notNullable().alter();
      table.dropColumn('github_id');
    })
  ])
};
