exports.seed = function(knex, Promise) {
  return knex('friendships').del()
    .then(function () {
      return Promise.all([
        knex('friendships').insert({id: 2001, requested_at: '2017-05-29 09:04:53.442085+00', responded_at: '',status: 'pending'}),
        knex('friendships').insert({id: 2002, requested_at: '2016-04-20 10:04:53.442085+00', responded_at: '2016-05-20 9:04:53.442085+00',status: 'accepted'}),
        knex('friendships').insert({id: 2003, requested_at: '2017-01-28 10:04:53.442085+00', responded_at: '2017-02-28 10:14:23.442085+00',status: 'rejected'}),
        knex('friendships').insert({id: 2004, requested_at: '2017-03-05 01:04:13.442085+00', responded_at: ''}),
      ]);
    });
};
