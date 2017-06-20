exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE challenges CASCADE')
    .then(function () {
      return Promise.all([
        knex('challenges').insert({ id: 5001,
                                    question_id: 4001,
                                    completed_at: '2017-05-29 10:04:53.442085+00',
                                    submitted_answer: 'blah blah1' }),
        knex('challenges').insert({ id: 5002,
                                    question_id: 4002,
                                    completed_at: '2017-01-28 12:10:53.442085+00',
                                    submitted_answer: 'blah blah2' }),
        knex('challenges').insert({ id: 5003,
                                    question_id: 4005,
                                    completed_at: '2017-01-30 11:04:53.442085+00',
                                    submitted_answer: 'blah blah3' }),
        knex('challenges').insert({ id: 5004,
                                    question_id: 4005,
                                    completed_at: null,
                                    submitted_answer: 'blah blah4' })
      ]);
    });
};
