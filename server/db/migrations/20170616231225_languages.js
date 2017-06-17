exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('languages', function(table){
      table.increments('id');
      table.string('name').notNullable();
    })
  ])
};

exports.down = function(knex, Promise) {
   return Promise.all([
    knex.schema.dropTable('languages')
  ])
};
