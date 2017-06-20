"use strict";

const express = require("express");
const router  = express.Router();

const passport = require('passport');

module.exports = (knex, bundleGenerated) => {

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
    function(req, res) {
      res.redirect('/dashboard');
    });

  router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {bundleGenerated :bundleGenerated } )
  })

  router.get('/api/profile', (req, res) => {
    let current_user = req.session.passport.user;
    knex
      .select('name', 'avatar', 'email', 'github_username')
      .from('users')
      .where({github_id: current_user})
      .then((results) => {
        res.json(results);
      })
  });

  router.get('/api/history', (req, res) => {
    let current_history = req.session.passport.user;
    knex
      .select('id', 'question_id', 'completed_at', 'submitted_answer')
      .from('challenges')
      .where({id: 5001})
      .then((results) => {
        res.json(results);
      })
  });

  router.get('/logout', (req,res) => {
    req.logOut();
    req.session.destroy();
    res.redirect('/');
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

  // router.get("/profile/:username", (req, res) => {
  // });

  // router.post("/profile/:username", (req, res) => {
  //   res.redirect("/profile/:username")
  // });


  return router;
};
