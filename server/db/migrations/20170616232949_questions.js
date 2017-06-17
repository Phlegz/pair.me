exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('questions', function(table){
      table.increments('id');
      table.enu('difficulty', ['easy', 'medium', 'hard']);
      table.string('question', 1000);
      table.string('answer', 1000);
      table.string('unit_test', 1000);
      table.string('title');
      table.integer('language_id').unsigned();
      table.foreign('language_id').references('languages_id')

    })
  ])
};

exports.down = function(knex, Promise) {
   return knex.raw("drop table questions cascade");
};



