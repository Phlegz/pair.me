exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('challenges', function(table){
      table.increments('id');
      table.time('duration')
      table.integer('question_id').unsigned();
      table.foreign('question_id').references('questions.id').onDelete('CASCADE');
      table.boolean('completed')
    })
  ])
};

exports.down = function(knex, Promise) {
   return Promise.all([
    knex.schema.dropTable('challenges')
  ])
};