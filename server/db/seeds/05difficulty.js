exports.seed = function(knex, Promise) {
  return knex('difficulty').del()
    .then(function () {
      return Promise.all([
        knex('difficulty').insert({id: 1, level: 1 }),
        knex('difficulty').insert({id: 2, level: 2 }),
        knex('difficulty').insert({id: 3, level: 3 }),
        knex('difficulty').insert({id: 4, level: 4 }),
        knex('difficulty').insert({id: 5, level: 5 })
      ]);
    });
};
