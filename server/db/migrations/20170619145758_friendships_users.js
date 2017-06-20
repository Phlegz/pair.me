exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('friendships_users', function(table){
      table.increments('id');
      table.integer('user_id');
      table.foreign('user_id').references('users.id');
      table.integer('friendship_id');
      table.foreign('friendship_id').references('friendships.id');
      table.boolean('initiator').notNullable();
      table.unique(['user_id', 'friendship_id']);
      table.unique(['friendship_id', 'initiator']);
      table.timestamps(true,true);
    })
  ])
};

exports.down = function(knex, Promise) {
   return knex.raw("drop table friendships_users cascade");
};
