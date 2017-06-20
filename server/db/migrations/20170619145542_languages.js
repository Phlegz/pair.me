exports.up = function(knex, Promise) {
  return knex.schema.createTable('languages', function(table){
      table.increments('id');
      table.string('name').notNullable();
      table.timestamps(true,true);
    })
};

exports.down = function(knex, Promise) {
   return knex.raw("drop table languages cascade");
};
