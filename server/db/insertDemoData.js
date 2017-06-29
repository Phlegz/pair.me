const config = require('../knexfile.js')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(config);

function createUsers() {
  return knex('users').returning('id').insert([
    {
      name: 'David',
      online: true,
      about: 'Instructor at Lighthouse Labst',
      email: 'david@gmail.com',
      github_username: 'davidvandusen',
      avatar: 'https://avatars0.githubusercontent.com/u/3359121?v=3&s=400',
      github_id:1234,
    },
    {
      name: 'Don',
      online: true,
      about: 'My students made me make this account',
      email: 'donburks@gmail.com',
      github_username: 'donburks',
      avatar: 'https://pbs.twimg.com/profile_images/523518790479265792/XqVYmeU3_400x400.png',
      github_id:2345,
    },
    {
      name: 'Louie',
      online: false,
      about: 'Give me some time and I solve your problem :D',
      email: 'louie@gmail.commm',
      github_username: 'louie56',
      avatar: 'http://brokelyn.com/wp-content/uploads/2014/07/cat-computer.jpg',
      github_id: 3445,
    },
    {
      name: 'Drake',
      online: false,
      about: 'I love webRTC lol',
      email: 'dw@gmail.comm',
      github_username: 'Drake',
      avatar: 'http://199.254.238.46/images/nyan-cat-02.png',
      github_id: 6789,
    },
    {
      name: 'Rosy',
      online: true,
      about: '',
      email: 'rosy@lhl.comm',
      github_username: 'rosiLHL',
      avatar: 'https://lighthouselabs.ca/uploads/team_member/avatar/77/medium_rosy_2x.jpg',
      github_id: 123455,
    },

  ]);
}

function selectLanguages() {
  return knex('languages').select('*');
}

function addUserLanguages(userId,languages) {
      return knex('languages_users').insert(languages.map((language) => {
        return {
          user_id:userId,
          language_id: language.id
        }
      })
    );
}

function createFriendship(initiatorId, recipientId) {
  return knex('friendships').returning('id').insert({
    requested_at: knex.raw('now()'),
    responded_at: knex.raw('now()'),
    status: 'accepted'
  }).then(friendshipIds => {
    return knex('friendships_users').insert([
      {
        friendship_id: friendshipIds[0],
        user_id: initiatorId,
        initiator: true
      },
      {
        friendship_id: friendshipIds[0],
        user_id: recipientId,
        initiator: false
      }
    ]);
  });
}

function selectRandomQuestion(num) {
  return knex('questions').select('*').orderBy(knex.raw('random()')).limit(num);
}

function createSession(userId1, userId2, numberOfChallenges) {
  return Promise.all([
    selectRandomQuestion(numberOfChallenges),
    knex('sessions').returning('id').insert({
      started_at: knex.raw('now()'),
      stopped_at: knex.raw('now()')
    })
  ])
    .then(([questions,sessionIds]) => {
      return Promise.all([
        knex('sessions_users').insert([
          {
            session_id: sessionIds[0],
            user_id: userId1
          },
          {
            session_id: sessionIds[0],
            user_id: userId2
          }
        ]),
        knex('challenges').insert(
            questions.map(question => ({
              question_id: question.id,
              session_id: sessionIds[0],
              completed_at: knex.raw('now()'),
              submitted_answer: question.answer,
              challenge_status: 'completed'
            }))
        )
      ])
    });
}

// create users
knex.raw('TRUNCATE TABLE users CASCADE')
.then(() => knex.raw('TRUNCATE TABLE friendships CASCADE'))
.then(() => knex.raw('TRUNCATE TABLE sessions CASCADE'))
.then(() => {
  return Promise.all([
    createUsers(),
    selectLanguages()
  ])
})
.then(([userIds,languages]) => {
  return Promise.all([
    addUserLanguages(userIds[0],[languages[0],languages[1]]),
    addUserLanguages(userIds[1],[languages[0],languages[2]]),
    addUserLanguages(userIds[2],[languages[0],languages[3]]),
    addUserLanguages(userIds[3],[languages[0]]),
    createFriendship(userIds[0], userIds[1]),
    createFriendship(userIds[2], userIds[3]),
    createFriendship(userIds[1], userIds[3]),
    createFriendship(userIds[2], userIds[3]),
    createSession(userIds[0], userIds[1], 2),
    createSession(userIds[2], userIds[1], 1),
    createSession(userIds[1], userIds[3], 3),
    createSession(userIds[2], userIds[3], 1)
  ]).then(() => Promise.resolve(userIds));
})
  .then(() => {
    knex.destroy();
  })
