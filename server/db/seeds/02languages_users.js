exports.seed = function(knex, Promise) {
  return knex('languages_users').del()
    .then(function () {
      return Promise.all([
        knex('languages_users').insert({id: 1, user_id: 1001, language_id: 1}),
        knex('languages_users').insert({id: 2, user_id: 1002, language_id: 3}),
        knex('languages_users').insert({id: 3, user_id: 1003, language_id: 4}),
        knex('languages_users').insert({id: 4, user_id: 1004, language_id: 2})
      ]);
    });
};
