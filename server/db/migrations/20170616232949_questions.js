exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('questions', function(table){
      table.increments('id');
      table.string('question', 5000);
      table.string('answer', 5000);
      table.string('unit_test', 5000);
      table.string('title');
      table.integer('language_id').unsigned();
      table.foreign('language_id').references('languages.id');
      table.integer('difficulty_id').unsigned();
      table.foreign('difficulty_id').references('difficulty.id');
    })
  ])
};

exports.down = function(knex, Promise) {
   return knex.raw("drop table questions cascade");
};



