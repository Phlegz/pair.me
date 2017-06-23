const config = require('../knexfile.js')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(config);



function createFriendship(initiatorId, recipientId) {
  return knex('friendships').insert({
    requested_at: knex.raw('now()'),
    responded_at: knex.raw('now()'),
    status: 'accepted'
  }).then(friendshipId => {
    knex('friendships_users').insert([{
      friendship_id: friendshipId,
      user_id: initiatorId,
      initiator: true
    }, {
      friendship_id: friendshipId,
      user_id: recipientId,
      initiator: false
    }]);
  });
}

function createSession(userId1, userId2) {
  return knex('sessions').insert({
    started_at: knex.raw('now()'),
    stopped_at: knex.raw('now()')
  }).then(sessionId => {
      knex('sessions_users').insert([
        {
          session_id: sessionId,
          user_id: userId1
        },
        {
          session_id: sessionId,
          user_id: userId2
        }
      ]);
    });
}

// TODO create users
knex.raw('TRUNCATE TABLE users CASCADE')
.then(() => knex('friendships').del())
.then(() => knex('sessions').del())
.then(() => {
  return knex('users').returning('id').insert([
    {
      name: 'Bernice',
      github_username: 'btannn',
      email: 'bernicetannnn@gmail.com',
      avatar: 'https://avatars3.githubusercontent.com/u/22797177?v=3&s=400',
    },
    {
      name: '',
      github_username: 'Farnaz',
      email: 'farnazzz@gmail.com',
      avatar: 'https://avatars1.githubusercontent.com/u/12521141?v=3&u=8ab33b35e13dd4856266887a2de3a89a8492090b&s=400',
    },
    {
      name: 'Ervin',
      github_username: 'ervin',
      email: 'ervin@gmail.commm',
      avatar: 'https://avatars1.githubusercontent.com/u/26450157?v=3&s=400',
    },
    {
      name: 'Derrel',
      github_username: 'derrel',
      email: 'dw@gmail.comm',
      avatar: 'https://avatars0.githubusercontent.com/u/24903790?v=3&s=400',
    }
  ])
})
.then(userIds => {
  // TODO make users friends
  return Promise.all([
  createFriendship(userIds[0], userIds[1]),
  createFriendship(userIds[2], userIds[3]),
  createFriendship(userIds[1], userIds[3]),
  createFriendship(userIds[2], userIds[3])
  ]).then(() => Promise.resolve(userIds));
})
.then(() => {
  knex.destroy();
})
    // .then(userIds => {
    // // TODO challenges/sessions/etc.
    // return Promise.all([
    // createSession(userIds[0], userIds[1]),
    // createSession(userIds[2], userIds[1]),
    // createSession(userIds[1], userIds[3]),
    // createSession(userIds[2], userIds[3])
    // ]).then(() => Promise.resolve(userIds));
    //
    // });
