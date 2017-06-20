exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('challenges', function(table){
      table.increments('id');
      table.integer('question_id');
      table.foreign('question_id').references('questions.id');
      table.text('submitted_answer');
      table.timestamp('completed_at');
      table.timestamps(true,true);
    })
  ])
};

exports.down = function(knex, Promise) {
   return knex.raw("drop table challenges cascade");
};
