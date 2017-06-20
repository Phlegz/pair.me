exports.seed = function(knex, Promise) {
  return knex('sessions').del()
    .then(function () {
      return Promise.all([
        knex('sessions').insert({id: 6001, user_id: 1001, challenge_id: 5001, started_at: '2017-01-28 10:04:53.442085+00', stopped_at: '2017-01-28 12:05:53.442085+00'}),
        knex('sessions').insert({id: 6002, user_id: 1003, challenge_id: 5001, started_at: '2017-01-29 10:04:53.442085+00', stopped_at: '2017-01-29 11:04:53.442085+00'}),
        knex('sessions').insert({id: 6003, user_id: 1002, challenge_id: 5002, started_at: '2017-01-30 11:04:53.442085+00', stopped_at: '2017-01-30 01:04:53.442085+00'}),
        knex('sessions').insert({id: 6004, user_id: 1003, challenge_id: 5002, started_at: '2017-01-27 10:04:53.442085+00', stopped_at: '2017-01-27 11:07:53.442085+00'})
      ]);
    });
};

