exports.seed = function(knex, Promise) {
  return knex('friendships_users').del()
    .then(function () {
      return Promise.all([
        knex('friendships_users').insert({id: 3001, user_id: 1001, friendship_id: 2001, initiator: true }),
        knex('friendships_users').insert({id: 3002, user_id: 1002, friendship_id: 2001, initiator: false }),
        knex('friendships_users').insert({id: 3003, user_id: 1001, friendship_id: 2002, initiator: false }),
        knex('friendships_users').insert({id: 3004, user_id: 1003, friendship_id: 2002, initiator: true }),
        knex('friendships_users').insert({id: 3005, user_id: 1002, friendship_id: 2003, initiator: false }),
        knex('friendships_users').insert({id: 3006, user_id: 1003, friendship_id: 2003, initiator: true }),
        knex('friendships_users').insert({id: 3007, user_id: 1003, friendship_id: 2004, initiator: true }),
        knex('friendships_users').insert({id: 3008, user_id: 1004, friendship_id: 2004, initiator: false }),
      ]);
    });
};
