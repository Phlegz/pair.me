
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE users CASCADE')
    .then(function () {
      return Promise.all([
        knex('users').insert({ id: 1,
                               name: 'Bernice Tan',
                               email: "bernice@example.com",
                               access_token: "asdf1234",
                               avatar: "img1.png",
                               github_username: "bernicetann" }),
        knex('users').insert({ id: 2,
                               name: 'Farnaz Rashidi',
                               email: "farnaz@example.com",
                               access_token: "abckjsdlfds2",
                               avatar: "img2.png",
                               github_username: "farnazzz" }),
        knex('users').insert({ id: 3,
                               name: 'Ervin Ong',
                               email: "ervin@example.com",
                               access_token: "abckjsdlfds3",
                               avatar: "img3.png",
                               github_username: "ervinlouie" }),
        knex('users').insert({ id: 4,
                               name: 'Steven Lee',
                               email: "steven@example.com",
                               access_token: "abckjsdlfds4",
                               avatar: "img4.png",
                               github_username: "stevenlee" })
      ]);
    });
};
