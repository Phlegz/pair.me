const config = require('../knexfile.js')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(config);

knex.raw('TRUNCATE TABLE questions CASCADE')
.then(() => knex('languages').del())
.then(() => {
  return knex('languages').returning('id').insert([
    {name: "javascript"},
    {name: "python"},
    {name: "ruby"},
    {name: "java"},
  ])
})
  .then(languagesIds => {
    return knex('questions').insert([
      {
       question: "Write a JavaScript function that reverse a number.",
       example: "\/*\r\n\r\nExample:\r\n\r\nreverse_a_number(1234567890);\r\n\r\nExpected output:\r\n=> \'0987654321\'\r\n\r\n*\/",
       placeholder: "function reverse_a_number(n) {\r\n  \/* Put your code here*\/\r\n\r\n}",
       answer: "function reverse_a_number(n) {\r\n  n += \'\';\r\n  return n.split(\'\').reverse().join(\'\');\r\n}",
       unit_test: "reverse_a_number(1234567890);",
       test_result: "'0987654321'",
       language_id: languagesIds[0],
       title: "Reverse the Number",
       difficulty: 3
      },
      {
       question: "Write a JavaScript function that returns a passed string with letters in alphabetical order.",
       example: "\/*\r\n\r\nExample:\r\nalphabet_order(\'webmaster\');\r\n\r\nExpected Output: \r\n=> \'abeemrstw\'\r\n\r\n*\/",
       placeholder: "function alphabet_order(str) {\r\n  \/* Put your code here *\/\r\n\r\n}",
       answer: "function alphabet_order(str) {\r\n  return str.split(\'\').sort().join(\'\');\r\n}",
       unit_test: "alphabet_order('webmaster');",
       test_result: "'abeemrstw'",
       language_id: languagesIds[0],
       title: "Returns a passed string with letters in alphabetical order",
       difficulty: 3
      },
      {
       question: "Write a JavaScript function that accepts a number as a parameter and check the number is prime or not.\n\nNote : A prime number (or a prime) is a natural number greater than 1 that has no positive divisors other than 1 and itself.",
       example: "\/*\r\n\r\nExample:\r\ntest_prime(37);\r\n\r\nExpected Output: \r\n=> true\r\n\r\n*\/",
       placeholder: "function test_prime(n) {\r\n  \/* Put your code here *\/\r\n\r\n}",
       answer: "function test_prime(n) {\r\n  if (n === 1) {\r\n    return false;\r\n  } else if (n === 2) {\r\n    return true;\r\n  } else {\r\n    for(var x = 2; x < n; x++) {\r\n      if(n % x === 0) {\r\n        return false;\r\n      }\r\n    }\r\n  return true;  \r\n  }\r\n}",
       unit_test: "test_prime(37);",
       test_result: "true",
       language_id: languagesIds[0],
       title: "Check a number is prime or not",
       difficulty: 3
      }
    ]);
  })
  .then(() => {
    knex.destroy();
  })
