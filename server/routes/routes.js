"use strict";

const express = require("express");
const router  = express.Router();

const passport = require('passport');

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
    function(req, res) {
      res.redirect('/dashboard');
    });

  router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {bundleDashboardGenerated :bundleDashboardGenerated } )
  })

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
    res.send('you reaced the challenges page');
  //   knex('challenges').insert ({
  //   submitted_answer: 
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

  // router.get("/profile/:username", (req, res) => {
  // });

  // router.post("/profile/:username", (req, res) => {
  //   res.redirect("/profile/:username")
  // });


  return router;
};
