exports.seed = function(knex, Promise) {
  return knex('relationships_users').del()
    .then(function () {
      return Promise.all([
        knex('relationships_users').insert({id: 1, user1_id: 1, user2_id: 2, relationship_id: 1 }),
        knex('relationships_users').insert({id: 2, user1_id: 2, user2_id: 3, relationship_id: 2 }),
        knex('relationships_users').insert({id: 3, user1_id: 3, user2_id: 4, relationship_id: 3 }),
        knex('relationships_users').insert({id: 4, user1_id: 4, user2_id: 1, relationship_id: 1 })
      ]);
    });
};
