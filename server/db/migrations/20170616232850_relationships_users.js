exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('relationships_users', function(table){
      table.increments('id');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
      table.integer('relationship_id').unsigned();
      table.foreign('relationship_id').references('relationships.id').onDelete('CASCADE');
      table.boolean('status');
    })
  ])
};

exports.down = function(knex, Promise) {
   return Promise.all([
    knex.schema.dropTable('challenges')
  ])
};
``