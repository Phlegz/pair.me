exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE challenges CASCADE')
    .then(function () {
      return Promise.all([
        knex('challenges').insert({ id: 1,
                                    question_id: 1,
                                    completed: true,
                                    duration: 60,
                                    users_answer: 'blah blah1' }),
        knex('challenges').insert({ id: 2,
                                    question_id: 2,
                                    completed: false,
                                    duration: 75,
                                    users_answer: 'blah blah2' }),
        knex('challenges').insert({ id: 3,
                                    question_id: 3,
                                    completed: true,
                                    duration: 700,
                                    users_answer: 'blah blah3' })
      ]);
    });
};
