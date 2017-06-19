exports.seed = function(knex, Promise) {
  return knex('relationships_users').del()
    .then(function () {
      return Promise.all([
        knex('relationships_users').insert({id: 1, user1_id: 1001, user2_id: 1002, relationship_id: 1 }),
        knex('relationships_users').insert({id: 2, user1_id: 1002, user2_id: 1003, relationship_id: 2 }),
        knex('relationships_users').insert({id: 3, user1_id: 1003, user2_id: 1004, relationship_id: 3 }),
        knex('relationships_users').insert({id: 4, user1_id: 1004, user2_id: 1001, relationship_id: 1 })
      ]);
    });
};
