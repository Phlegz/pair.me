exports.seed = function(knex, Promise) {
  return knex('relationships').del()
    .then(function () {
      return Promise.all([
        knex('relationships').insert({id: 1, status: 'accepted'}),
        knex('relationships').insert({id: 2, status: 'rejected'}),
        knex('relationships').insert({id: 3, status: 'pending'})
      ]);
    });
};
