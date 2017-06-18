exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('difficulty', function(table){
      table.increments('id');
      table.enu('level', [1, 2, 3, 4, 5]);
    })
  ])
};

exports.down = function(knex, Promise) {
   return knex.raw("drop table difficulty cascade");
};

