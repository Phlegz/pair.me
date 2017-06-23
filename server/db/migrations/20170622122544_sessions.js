exports.up = function(knex, Promise) {
  return knex.schema.createTable('sessions', (table) => {
      table.increments('id');
      table.timestamp('started_at');
      table.timestamp('stopped_at');
      table.timestamps(true,true);
    })
};

exports.down = function(knex, Promise) {
   return knex.raw("drop table sessions cascade");
};
