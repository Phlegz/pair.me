exports.up = function(knex, Promise) {
  return knex.schema.createTable('challenges', (table) => {
      table.increments('id');
      table.integer('session_id');
      table.foreign('session_id').references('sessions.id');
      table.integer('question_id');
      table.foreign('question_id').references('questions.id');
      table.text('submitted_answer');
      table.string('challenge_status');//completed, skipped, incomplete, show_answer
      table.timestamp('completed_at');
      table.timestamps(true,true);
    })
};

exports.down = function(knex, Promise) {
   return knex.raw("drop table challenges cascade");
};
