"use strict";

const express = require("express");
const router  = express.Router();

const passport = require('passport');
const sandbox = require('sandbox');
const sb = new sandbox();

module.exports = (knex) => {

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

  router.post('/api/dashboard', ensureAuthenticated, (req, res) => {
    let pairResult = {
        difficulty: req.body.difficulty,
        language: req.body.language,
      };
    let currentUser = req.session.passport.user
    knex.raw('select * from users where online=true and github_id != ?',[currentUser])
    .then((results) => {
      let shuffled = results.rows.sort(() => Math.random() * 2 - 1);
      res.json(shuffled[0]);
    })

  })

  router.get('/api/dashboard', (req, res) => {
    let current_user = req.session.passport.user;
    knex
      .select('difficulty')
      .from('questions')
      .where('difficulty', '>', 0)
      .then((results) => {
        return res.json(results);
        console.log(results, 'RESULLTSS');
      })
    return res.render('dashboard');
  })

  router.get('/api/profile_current', (req, res) => {
    let current_user = req.session.passport.user;
    knex
      .select('name', 'avatar', 'email', 'github_username')
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
        github_username: req.body.github_username
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
    // let current_history = req.session.passport.user;
    knex('questions')
      .join('challenges' , {'questions.id': 'challenges.question_id'})
      .select('challenges.id', 'question', 'submitted_answer', 'completed_at')
      .from('questions')
      .where({'challenges.id': 5001})
      .then((results) => {
        res.json(results);
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
        let shuffled = results.sort(() => Math.random() * 2 - 1);
        res.json(shuffled);
      })
  })

  router.post('/api/notifications', (req, res) => {
    let currentUser = req.session.passport.user
    let currentUserId= knex.select('id').from('users').where('github_id',currentUser);

    return knex('notifications').returning('id').insert([
      {
      user_id: currentUserId,
      initiator: true,
      },
      {
      user_id: req.body.acceptingUserId,
      initiator: false,
      }
    ]).then(()=> {
      res.status(200).send('Notification request sent')
    })
  })

  router.post('/api/notifications/cancel', (req, res) => {
    let currentUser = req.session.passport.user
    let currentUserId= knex.select('id').from('users').where('github_id',currentUser);

    knex('notifications').where({user_id: currentUserId, status: 'pending'}).update({status: 'rejected'})
    .then(knex('notifications').where({user_id: req.body.acceptingUserId, status: 'pending'}).update({status: 'rejected'})
      .then(()=> {
        res.status(200).send('Notification request cancelled')
      }) 
    )
  })




  // Should be last route
  router.get('/*', ensureAuthenticated, (req, res) => {
    res.cookie("unsafe_user_name", req.user.github_username);
    res.render('dashboard');
  })

  return router;
};
