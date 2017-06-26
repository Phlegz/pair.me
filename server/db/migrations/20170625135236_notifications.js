
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notifications', (table) => {
      table.increments('id');
      table.string('status').defaultTo('pending'); //accepted,rejected,ignored
      table.timestamps(true,true);
    })
};

exports.down = function(knex, Promise) {
  return knex.raw("drop table notifications cascade");
};
