exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE challenges CASCADE')
    .then(function () {
      return Promise.all([
        knex('challenges').insert({ id: 5001,
                                    question_id: 4001,
                                    completed_at: '',
                                    submitted_answer: 'blah blah1' }),
        knex('challenges').insert({ id: 5002,
                                    question_id: 4002,
                                    completed_at: '',
                                    submitted_answer: 'blah blah2' }),
        knex('challenges').insert({ id: 5003,
                                    question_id: 4005,
                                    completed_at: '',
                                    submitted_answer: 'blah blah3' }),
        knex('challenges').insert({ id: 5004,
                                    question_id: 4005,
                                    completed_at: '',
                                    submitted_answer: 'blah blah4' })
      ]);
    });
};
