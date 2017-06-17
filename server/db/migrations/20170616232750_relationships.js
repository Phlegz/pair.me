exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('relationships', function(table){
      table.increments('id');
      table.enu('status', ['rejected', 'pending', 'accepted']);
    })
  ])
};

exports.down = function(knex, Promise) {
   return knex.raw("drop table relationships cascade");
};
