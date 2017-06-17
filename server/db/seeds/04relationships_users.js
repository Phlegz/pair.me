exports.seed = function(knex, Promise) {
  return knex('relationships_users').del()
    .then(function () {
      return Promise.all([
        knex('relationships_users').insert({id: 1, user_id: 1, relationship_id: 1, status: true }),
        knex('relationships_users').insert({id: 2, user_id: 2, relationship_id: 1, status: false }),
        knex('relationships_users').insert({id: 3, user_id: 3, relationship_id: 2, status: true }),
        knex('relationships_users').insert({id: 4, user_id: 4, relationship_id: 2, status: true }),
      ]);
    });
};
