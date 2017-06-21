"use strict";

const express = require("express");
const router  = express.Router();

const passport = require('passport');
const sandbox = require('sandbox');
const sb = new sandbox();

module.exports = (knex, bundleDashboardGenerated, bundleChallengeGenerated) => {

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
    res.render('dashboard', {bundleDashboardGenerated :bundleDashboardGenerated } )
  })

  router.get('/api/profile_current', (req, res) => {
    let current_user = req.session.passport.user;
    console.log(current_user);//github_id
    knex
      .select('name', 'avatar', 'email', 'github_username')
      .from('users')
      .where({github_id: current_user})
      .then((results) => {
        res.json(results);
      })
  });

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

    let textValue = JSON.parse(req.body.answer);
    // console.log("BODY",req.body.answer);
    // console.log("PARSED",textValue);
    // sandbox
    sb.run(`${textValue}`,
      function(output) {
        // console.log("OUTPUT",output);
        // console.log("OUTPUT RESULT",output.result);
        // console.log("CONSOLE LOG",output.console);
        res.json(JSON.stringify(output));
      }
    );
  })

  router.get('/challenge', ensureAuthenticated, (req, res) => {
    res.render('challengePage', {bundleChallengeGenerated :bundleChallengeGenerated } )
  })

  // router.get("/", (req, res) => {
  // });

  // router.post("/", (req, res) => {

  // });



  // router.post("/dashboard", (req, res) => {

  //   res,redirect("/challenge/:challenge_id")
  // });

  // find_match

  // start_challenge





  // router.get("/challenges/:username", (req, res) => {
  // });


  // router.get("/challenge/:challenge_id", (req, res) => {
  // });

  // router.post("/profiles/:username", (req, res) => {
  //   res.redirect("/profiles/:username")
  // });
  router.get('/*', ensureAuthenticated, (req, res) => {
    res.cookie("unsafe_user_name", req.user.github_username);
    res.render('dashboard', {bundleGenerated} );
  })

  return router;
};
