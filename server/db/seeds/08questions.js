
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE questions CASCADE')
    .then(function () {
      return Promise.all([
        /*ALL QUESTIONS from http://www.w3resource.com/javascript-exercises/javascript-functions-exercises.php */
        knex('questions').insert({ id: 1001,
                                   question: "Write a JavaScript function that reverse a number",
                                   example: "\/\/ Example:\r\n\r\n\/\/ reverse_a_number(1234567890);\r\n\r\n\/\/ Expected output:\r\n\/\/ => \'0987654321\'",
                                   placeholder: "function reverse_a_number(n) {\r\n  \/* Put your code here*\/\r\n\r\n}",
                                   answer: "function reverse_a_number(n) {\r\n  n += \'\';\r\n  return n.split(\'\').reverse().join(\'\');\r\n}",
                                   unit_test: "reverse_a_number(1234567890);",
                                   test_result: "'0987654321'",
                                   language_id: 1,
                                   title: "Reverse the Number",
                                   difficulty: 1})
        // knex('questions').insert({ id: 1002,
        //                            question: "Output track 1",
        //                            answer: "answer2",
        //                            unit_test: "testing2",
        //                            language_id: 2,
        //                            title: "music library",
        //                            difficulty: 1 }),
        // knex('questions').insert({ id: 1003,
        //                            question: "Find the smallest and second smallest integer",
        //                            answer: "answer3",
        //                            unit_test: "testing3",
        //                            language_id: 1,
        //                            title: "array length",
        //                            difficulty: 1 }),
        // knex('questions').insert({ id: 1004,
        //                            question: "Sort the array from biggest to smallest",
        //                            answer: "answer4",
        //                            unit_test: "testing4",
        //                            language_id: 3,
        //                            title: "array sorting",
        //                            difficulty: 1 }),
        // knex('questions').insert({ id: 1005,
        //                            question: "Write a function blah blah",
        //                            answer: "answer5",
        //                            unit_test: "testing5",
        //                            language_id: 1,
        //                            title: "function",
        //                            difficulty: 1 }),
        // knex('questions').insert({ id: 1006,
        //                            question: "Make a function that multiplies two number together",
        //                            answer: "answer1",
        //                            unit_test: "testing1",
        //                            language_id: 1,
        //                            title: "calculator",
        //                            difficulty: 3}),
        // knex('questions').insert({ id: 1007,
        //                            question: "Output track 1",
        //                            answer: "answer2",
        //                            unit_test: "testing2",
        //                            language_id: 2,
        //                            title: "music library",
        //                            difficulty: 3 }),
        // knex('questions').insert({ id: 1008,
        //                            question: "Find the smallest and second smallest integer",
        //                            answer: "answer3",
        //                            unit_test: "testing3",
        //                            language_id: 1,
        //                            title: "array length",
        //                            difficulty: 3 }),
        // knex('questions').insert({ id: 1009,
        //                            question: "Sort the array from biggest to smallest",
        //                            answer: "answer4",
        //                            unit_test: "testing4",
        //                            language_id: 3,
        //                            title: "array sorting",
        //                            difficulty: 3 }),
        // knex('questions').insert({ id: 1010,
        //                            question: "Write a function blah blah",
        //                            answer: "answer5",
        //                            unit_test: "testing5",
        //                            language_id: 1,
        //                            title: "function",
        //                            difficulty: 3 })
      ]);
    });
};
