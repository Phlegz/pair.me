exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
      table.increments('id');
      table.string('name');
      table.boolean('online').defaultTo(true);
      table.text('about');
      table.string('email');
      table.string('github_username').notNullable().unique();
      table.string('access_token');
      table.string('avatar');
      table.integer('github_id');
      table.string('twitter_handle').unique();
      table.timestamps(true,true);
    })
};

exports.down = function(knex, Promise) {
   return knex.raw("drop table users cascade");
};
