exports.seed = function(knex, Promise) {
  return knex('sessions').del()
    .then(function () {
      return Promise.all([
        knex('sessions').insert({id: 6001, user_id: 1001, challenge_id: 5001, started_at: '', stopped_at: ''}),
        knex('sessions').insert({id: 6002, user_id: 1003, challenge_id: 5001, started_at: '', stopped_at: ''}),
        knex('sessions').insert({id: 6003, user_id: 1002, challenge_id: 5002, started_at: '', stopped_at: ''})
        knex('sessions').insert({id: 6004, user_id: 1003, challenge_id: 5002, started_at: '', stopped_at: ''})
      ]);
    });
};




table.increments('id');
table.integer('user_id');
table.foreign('user_id').references('users.id');
table.integer('challenge_id');
table.foreign('challenge_id').references('challenges.id');
table.timestamp('started_at');
table.timestamp('stopped_at');
