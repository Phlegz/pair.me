
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE users CASCADE')
    .then(function () {
      return Promise.all([
        knex('users').insert({ id: 1,
                               github_login: "bernicetann",
                               github_avatar: "img1.png",
                               github_name: "bernice",
                               github_id: 1239182,
                               github_token: "asdf1234", }),
        knex('users').insert({ id: 2,
                               github_login: "farnazzz",
                               github_avatar: "img2.png",
                               github_name: "farnaz",
                               github_id: 2342341,
                               github_token: "abckjsdlfds2" }),
        knex('users').insert({ id: 3,
                               github_login: "ervinlouie",
                               github_avatar: "img3.png",
                               github_name: "ervin",
                               github_id: 3472987,
                               github_token: "abckjsdlfds3" }),
        knex('users').insert({ id: 4,
                               github_login: "stevenlee",
                               github_avatar: "img4.png",
                               github_name: "steven",
                               github_id: 2340981,
                               github_token: "abckjsdlfds4" })
      ]);
    });
};
