
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE questions CASCADE')
    .then(function () {
      return Promise.all([
        knex('questions').insert({ id: 1,
                                   question: "Make a function that multiplies two number together",
                                   difficulty_id: 1,
                                   answer: "answer1",
                                   unit_test: "testing1",
                                   language_id: 1,
                                   title: "calculator" }),
        knex('questions').insert({ id: 2,
                                   question: "Output track 1",
                                   difficulty_id: 2,
                                   answer: "answer2",
                                   unit_test: "testing2",
                                   language_id: 2,
                                   title: "music library" }),
        knex('questions').insert({ id: 3,
                                   question: "Find the smallest and second smallest integer",
                                   difficulty_id: 3,
                                   answer: "answer3",
                                   unit_test: "testing3",
                                   language_id: 1,
                                   title: "array length" }),
        knex('questions').insert({ id: 4,
                                   question: "Sort the array from biggest to smallest",
                                   difficulty_id: 4,
                                   answer: "answer4",
                                   unit_test: "testing4",
                                   language_id: 3,
                                   title: "array sorting" }),
        knex('questions').insert({ id: 5,
                                   question: "Write a function blah blah",
                                   difficulty_id: 5,
                                   answer: "answer5",
                                   unit_test: "testing5",
                                   language_id: 3,
                                   title: "function" })
      ]);
    });
};
