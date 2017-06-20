
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE users CASCADE')
    .then(function () {
      return Promise.all([
        knex('users').insert({ id: 1001,
                               name: 'Bernice',
                               email: "bernicetann@gmail.com",
                               github_username: "btan",
                               access_token: "asdf1234",
                               avatar: "img1.png",
                               github_id: 1239182 }),
        knex('users').insert({ id: 1002,
                               name: 'Farnaz',
                               email: "farnazzz@gmail.com",
                               github_username: "farnaz",
                               access_token: "abckjsds2",
                               avatar: "img2.png",
                               github_id: 2342341 }),
        knex('users').insert({ id: 1003,
                               name: 'ervin',
                               email: "ervin@gmail.com",
                               github_username: "ervin",
                               access_token: "abckjsds2",
                               avatar: "img3.png",
                               github_id: 2340001 }),
        knex('users').insert({ id: 1004,
                               name: 'dw',
                               email: "dw@gmail.com",
                               github_username: "dkyw",
                               access_token: "sdkj234",
                               avatar: "img4.png",
                               github_id: 23400123 }),
      ]);
    });
};
