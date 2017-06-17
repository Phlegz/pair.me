
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE languages CASCADE')
    .then(function () {
      return Promise.all([
        knex('languages').insert({id: 1, name: "Javascript"}),
        knex('languages').insert({id: 2, name: "Python"}),
        knex('languages').insert({id: 3, name: "PHP"}),
        knex('languages').insert({id: 4, name: "Java"})
      ]);
    });
};
