exports.seed = function(knex, Promise) {
  return knex('sessions').del()
    .then(function () {
      return Promise.all([
        knex('sessions').insert({id: 1, user1_id: 1001, user2_id: 1002, challenge_id: 1}),
        knex('sessions').insert({id: 2, user1_id: 1003, user2_id: 1004, challenge_id: 3}),
        knex('sessions').insert({id: 3, user1_id: 1002, user2_id: 1003, challenge_id: 2})
      ]);
    });
};
