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
      res.redirect('/dashboard');
    }
  );

  router.get('/dashboard', ensureAuthenticated, (req, res) => {
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
    req.logOut();
    req.session.destroy();
    res.redirect('/');
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







  // Should be last route
  router.get('/*', ensureAuthenticated, (req, res) => {
    res.cookie("unsafe_user_name", req.user.github_username);
    res.render('dashboard');
  })

  return router;
};
