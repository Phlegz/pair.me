exports.seed = function(knex, Promise) {
  return knex('sessions').del()
    .then(function () {
      return Promise.all([
        knex('sessions').insert({id: 1, user1_id: 1, user2_id: 2, challenge_id: 1}),
        knex('sessions').insert({id: 2, user1_id: 3, user2_id: 4, challenge_id: 3}),
        knex('sessions').insert({id: 3, user1_id: 2, user2_id: 3, challenge_id: 2})
      ]);
    });
};
