
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE questions CASCADE')
    .then(function () {
      return Promise.all([
        knex('questions').insert({ id: 4001,
                                   question: "Make a function that multiplies two number together",
                                   answer: "answer1",
                                   unit_test: "testing1",
                                   language_id: 1,
                                   title: "calculator",
                                   difficulty: 2}),
        knex('questions').insert({ id: 4002,
                                   question: "Output track 1",
                                   answer: "answer2",
                                   unit_test: "testing2",
                                   language_id: 2,
                                   title: "music library",
                                   difficulty: 1 }),
        knex('questions').insert({ id: 4003,
                                   question: "Find the smallest and second smallest integer",
                                   answer: "answer3",
                                   unit_test: "testing3",
                                   language_id: 1,
                                   title: "array length",
                                   difficulty: 4 }),
        knex('questions').insert({ id: 4004,
                                   question: "Sort the array from biggest to smallest",
                                   answer: "answer4",
                                   unit_test: "testing4",
                                   language_id: 3,
                                   title: "array sorting",
                                   difficulty: 3 }),
        knex('questions').insert({ id: 4005,
                                   question: "Write a function blah blah",
                                   answer: "answer5",
                                   unit_test: "testing5",
                                   language_id: 1,
                                   title: "function",
                                   difficulty: 5 })
      ]);
    });
};
