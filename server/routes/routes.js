"use strict";

const express = require("express");
const router  = express.Router();

const passport = require('passport');
const sandbox = require('sandbox');
const sb = new sandbox();

module.exports = (knex) => {

  function completedDifficulties(githubId) {
    console.log('here')
    return knex.raw(`
      SELECT
        challenges.completed_at,
        questions.difficulty
      FROM
        questions
        JOIN challenges ON challenges.question_id = questions.id
        JOIN sessions ON sessions.id = challenges.session_id
        JOIN sessions_users ON sessions_users.session_id = sessions.id
        JOIN users ON users.id = sessions_users.user_id
      WHERE
        users.github_username = ?
      ORDER BY
        challenges.completed_at
    `, [githubId]);
  }

  function history(githubId) {
    return knex.raw(`
      SELECT
        challenges.submitted_answer,
        challenges.completed_at,
        questions.question
      FROM
        questions
        JOIN challenges ON challenges.question_id = questions.id
        JOIN sessions ON sessions.id = challenges.session_id
        JOIN sessions_users ON sessions_users.session_id = sessions.id
        JOIN users ON users.id = sessions_users.user_id
      WHERE
        users.github_username = ?
      `, [githubId]);
  }

  function friendshipList(githubId) {
    return knex.raw(`
      SELECT
        other.id,
        other.avatar,
        other.github_username,
        other.online
      FROM
        friendships_users as fsu_other
        JOIN friendships on friendships.id = fsu_other.friendship_id
        JOIN friendships_users as fsu_me on fsu_me.friendship_id = friendships.id
        JOIN users as me on me.id = fsu_me.user_id
        JOIN users as other on other.id = fsu_other.user_id
      WHERE
        fsu_other.user_id <> fsu_me.user_id
        and friendships.status = 'accepted'
        and me.github_id = ?
      `, [githubId]);
  }

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
      res.redirect('/')
  }

  router.get('/', (req, res) => {
    res.render('index')
  })

  router.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ]
  }));

  //successful authentication, redirect to dashboard
  router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
      knex('users').where('github_id', req.session.passport.user).update({online: true})
      .then(() => {
        res.redirect('/dashboard');
      })
    }
  );

  router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard');
  })


  router.get('/api/statistics', (req, res) => {
    //TODO Do not hard code!
    let current_user = req.session.passport.user;
    completedDifficulties("Farnaz")
     .then((result) => {
      console.log(result.length, 'RESULTS');
      res.json(result);
      })
  });

  router.post('/api/dashboard', ensureAuthenticated, (req, res) => {
    let pairResult = {
        difficulty: req.body.difficulty,
        language: req.body.language,
        friend: req.body.friend
      };
    let currentUser = req.session.passport.user
    // knex.raw('select * from users where online=true and github_id != ?',[currentUser])
    // .then((results) => {
    //   let shuffled = results.rows.sort(() => Math.random() * 2 - 1);
    //   res.json(shuffled[0]);
    // })
    console.log(pairResult, "PAIRRESULT");
    if(pairResult.friend === 'random') {
      knex.raw('select * from users where online = true and github_id != ?',[currentUser])
      .then((results) => {
        let shuffled = results.rows.sort(() => Math.random() * 2 - 1);
          res.json(shuffled[0]);
      })
    } else {
      knex.raw('select * from users where github_username = ?', [pairResult.friend])
      .then((results) => {
        res.json(results);
      })
    }
  })

  router.get('/api/friends', (req,res) => {
    let current_user = req.session.passport.user;
    friendshipList(current_user)
    .then((result) => {
      res.json(result.rows);
    })
  });

  router.get('/api/profile_current', (req, res) => {
    let current_user = req.session.passport.user;
    knex
      .select('name', 'avatar', 'email', 'github_username', 'id', 'about', 'twitter_handle')
      .from('users')
      .limit(1)
      .where({github_id: current_user})
      .limit(1)
      .then((results) => {
        res.json(results[0]);
      })
  });


  router.put('/api/profile', (req, res) => {
    let current_user = req.session.passport.user;
    let updatedProfile = {
        avatar: req.body.avatar,
        name: req.body.name,
        email: req.body.email,
        github_username: req.body.github_username,
        about: req.body.about
      };
    knex('users')
      .where({github_id: current_user})
      .update(updatedProfile)
      .then((result) => {
        res.json(updatedProfile);
      })
  })

  router.get('/api/profiles/:username', (req, res) => {
    knex
      .select('name', 'avatar', 'email', 'github_username')
      .from('users')
      .where({github_username: req.params.username})
      .then((results) => {
        // TODO:  1) should only return one result when there is one
        // TODO:  2) if no result, do something helpful
        //              e.g. return a 404 ?
        res.json(results);
        // console.log(results, 'results from knex');
      })
  });


  router.get('/api/history', (req, res) => {
    //TODO: do not hard code
    // let current_history = req.session.passport.user;
    history("Farnaz")
      .then((result) => {
      res.json(result);
      })
  });

  router.get('/logout', (req,res) => {
    //TODO change the user status in the database
    knex('users').where('github_id', req.session.passport.user).update({online: false})
    .then(() => {
      req.logOut();
      req.session.destroy();
      res.redirect('/');})
  })

  router.get('/api/challenges', (req,res) => {
     knex
      .select("*")
      .from("challenges")
      .then((results) => {
        res.json(results);
    });
  })

  router.post('/api/challenges', (req,res) => {
    knex
      .select("id","unit_test")
      .from("questions")
      .then((results) => {
        // getting the question_id of posted question in challenges
        let frontQuestionId = req.body.questionId;
        // getting the value from ace editor
        let textValue = JSON.parse(req.body.answer);
        // get the unit_test from questions thru a forEach loop
        results.forEach((result) => {
          // comparing the same question id and getting the corresponding unit_test for that id
          if (result.id === frontQuestionId) {
            let unitTest = result.unit_test;
            console.log("UNIT_TEST",unitTest)
            // Sandbox Run of values from ace and unit_test
            sb.run(`${textValue}${unitTest}`,
              function(output) {
                res.json(JSON.stringify(output));
              } // sb_output
            ); // sb
          } // if-end
        }) // forEach-end
    }); // knex
  })

  router.get('/challenge', ensureAuthenticated, (req, res) => {
    res.render('challengePage')
  })


  router.get('/api/questions', (req,res) => {
    knex
      .select('*')
      .from('questions')
      .then((results) => {
        // let shuffled = results.sort(() => Math.random() * 2 - 1);
        res.json(results);
      })
  })

  router.get('/api/notifications', (req,res) => {
    // let currentUser = req.session.passport.user
    // let currentUserId= knex.select('id').from('users').where('github_id',currentUser);

    knex
      .select('notifications.id',
        'status',
        'user_id',
        'initiator',
        'github_username',
        'avatar')
      .from('notifications').leftJoin('notifications_users','notifications.id','notifications_users.notification_id').leftJoin('users','users.id','notifications_users.user_id')
      .whereIn('status', ['pending', 'rejected', 'accepted'])
      .then((results) => {
        console.log(results);
        res.json(results);
      })
  })

  router.post('/api/notifications', (req, res) => {
    let currentUser = req.session.passport.user;
      return Promise.all([
        knex.select('id').from('users').where('github_id',currentUser),
        knex('notifications').returning('id').insert({})
      ])
      .then(([currentUserId, notificationId]) => {
        return knex('notifications_users').insert([
          {
          notification_id: notificationId[0],
          user_id: currentUserId[0].id,
          initiator: true,
          },
          {
          notification_id: notificationId[0],
          user_id: req.body.acceptingUserId,
          initiator: false,
          }
        ]).then(()=> {
          res.status(200).send('Notification request sent')
        })
      })
  })

  router.post('/api/notifications/cancel', (req, res) => {
    //TODO: if you send a request to someone, and the request is pending or accepted their name sould not show up in the searc for other ppl
    const currentUser = req.session.passport.user
    // // BUG: TODO make sure no-one is stuck on status pending (e.g. close the browser on sending request)
    knex.raw(`
      select notifications.id
      from users
      join notifications_users nu on users.id = nu.user_id
      join notifications on notifications.id = nu.notification_id
      where notifications.status = 'pending'
      and users.github_id = ?
    `, [currentUser])
    .then((id_rows) => {
      console.log("id rows:", id_rows);
      console.log("id rows.rows:", id_rows.rows, JSON.stringify(id_rows.rows));
      const ids = id_rows.rows.map(row => row.id);
      console.log("ids:", ids, JSON.stringify(ids), typeof ids);

      return knex('notifications')
      .where('id', ids[0])
      .update({status: 'rejected'})
    }).then(() => {
      res.status(200).send();  // TODO: reconsider if this is stupid
    })
  })

  router.post('/api/notifications/abolish', (req, res) => {
    const currentUser = req.session.passport.user
    knex.raw("delete from notifications where status = 'rejected' or status = 'accepted'")
    .then(() => {
      res.status(200).send();  // TODO: reconsider if this is stupid
    })
  })

  router.post('/api/notifications/reject', (req, res) => {
    const currentUser = req.session.passport.user
    // // BUG: TODO make sure no-one is stuck on status pending (e.g. close the browser on sending request)
    knex.raw(`
      select notifications.id
      from users
      join notifications_users nu on users.id = nu.user_id
      join notifications on notifications.id = nu.notification_id
      where notifications.status = 'pending'
      and users.github_id = ?
    `, [currentUser])
    .then((id_rows) => {

      console.log("id rows:", id_rows);
      console.log("id rows.rows:", id_rows.rows, JSON.stringify(id_rows.rows));
      const ids = id_rows.rows.map(row => row.id);
      console.log("ids:", ids, JSON.stringify(ids), typeof ids);

      return knex('notifications')
      .where('id', ids[0])
      .update({status: 'rejected'})
    }).then(() => {
      res.status(200).send();  // TODO: reconsider if this is stupid
    })
  })

  router.post('/api/notifications/accept', (req, res) => {
    const currentUser = req.session.passport.user
    // // BUG: TODO make sure no-one is stuck on status pending (e.g. close the browser on sending request)
    knex.raw(`
      select notifications.id
      from users
      join notifications_users nu on users.id = nu.user_id
      join notifications on notifications.id = nu.notification_id
      where notifications.status = 'pending'
      and users.github_id = ?
    `, [currentUser])
    .then((id_rows) => {

      console.log("id rows:", id_rows);
      console.log("id rows.rows:", id_rows.rows, JSON.stringify(id_rows.rows));
      const ids = id_rows.rows.map(row => row.id);
      console.log("ids:", ids, JSON.stringify(ids), typeof ids);

      return knex('notifications')
      .where('id', ids[0])
      .update({status: 'accepted'})
    }).then(() => {
      res.status(200).send("Request Accepted");  // TODO: reconsider if this is stupid
    })
  })



  // Should be last route
  router.get('/*', ensureAuthenticated, (req, res) => {
    res.cookie("unsafe_user_name", req.user.github_username);
    res.render('dashboard');
  })

  return router;


};
