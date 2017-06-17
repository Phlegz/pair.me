exports.seed = function(knex, Promise) {
  return knex('languages_users').del()
    .then(function () {
      return Promise.all([
        knex('languages_users').insert({id: 1, user_id: 1, language_id: 1}),
        knex('languages_users').insert({id: 2, user_id: 2, language_id: 3}),
        knex('languages_users').insert({id: 3, user_id: 3, language_id: 4}),
        knex('languages_users').insert({id: 4, user_id: 4, language_id: 2})
      ]);
    });
};
