exports.seed = function(knex, Promise) {
  return knex('challenges_users').del()
    .then(function () {
      return Promise.all([
        knex('challenges_users').insert({id: 1, user_id: 1, challenge_id: 1}),
        knex('challenges_users').insert({id: 2, user_id: 2, challenge_id: 3}),
        knex('challenges_users').insert({id: 3, user_id: 1, challenge_id: 2})

      ]);
    });
};
