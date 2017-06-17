
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE questions CASCADE')
    .then(function () {
      return Promise.all([
        knex('questions').insert({id: 1, difficulty: 'easy', answer: "answer1", unit_test: "testing1", language_id: 1, title: "calculator"}),
        knex('questions').insert({id: 2, difficulty: 'medium', answer: "answer2", unit_test: "testing2", language_id: 2, title: "music library"}),
        knex('questions').insert({id: 3, difficulty: 'hard', answer: "answer3", unit_test: "testing3", language_id: 1, title: "array length"}),
        knex('questions').insert({id: 4, difficulty: 'easy', answer: "answer4", unit_test: "testing4", language_id: 3, title: "array sorting"}),
        knex('questions').insert({id: 5, difficulty: 'medium', answer: "answer5", unit_test: "testing5", language_id: 3, title: "function"})
      ]);
    });
};
