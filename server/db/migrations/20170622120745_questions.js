exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('questions', (table) => {
      table.increments('id');
      table.string('title');
      table.text('question');
      table.text('example');
      table.text('placeholder');
      table.text('answer');
      table.text('unit_test');
      table.text('test_result');
      table.integer('difficulty');
      table.integer('language_id');
      table.foreign('language_id').references('languages.id');
      table.timestamps(true,true);
    })
  ])
};

exports.down = function(knex, Promise) {
   return knex.raw("drop table questions cascade");
};
