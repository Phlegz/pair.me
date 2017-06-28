
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notifications_users', (table) => {
    table.increments('id');
    table.integer('user_id');
    table.foreign('user_id').references('users.id');
    table.integer('notification_id');
    table.boolean('initiator');
    table.unique(['user_id', 'notification_id']);
    table.unique(['notification_id', 'initiator']);
    table.timestamps(true,true);
  })
};

exports.down = function(knex, Promise) {
  return knex.raw("drop table notifications_users cascade");
};
