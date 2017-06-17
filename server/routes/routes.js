"use strict";

const express = require("express");
const router  = express.Router();

module.exports = (knex, bundleGenerated) => {

  router.get('/', (req, res) => {
    res.render('index')
  })

  router.get('/dashboard', (req, res) => {
    res.render('dashboard', {bundleGenerated :bundleGenerated } )
  })

  // router.get("/", (req, res) => {
  // });

  // router.post("/", (req, res) => {

  // });



  router.get("/dashboard", (req, res) => {
    res.render(dashboard)
  });

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
