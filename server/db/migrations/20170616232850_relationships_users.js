exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('relationships_users', function(table){
      table.increments('id');
      table.integer('user1_id').unsigned();
      table.foreign('user1_id').references('users.id');
      table.integer('user2_id').unsigned();
      table.foreign('user2_id').references('users.id');
      table.integer('relationship_id').unsigned();
      table.foreign('relationship_id').references('relationships.id');
    })
  ])
};

exports.down = function(knex, Promise) {
   return knex.raw("drop table relationships_users cascade");
};
