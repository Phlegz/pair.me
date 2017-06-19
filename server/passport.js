const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport');

module.exports = function(knex, passport) {

  //required for persistent login sessions
  //passport needs ability to serialize and deserialize users out of sessions
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    knex('users').where('github_id',id)
    .then(user => {done(null, user[0])
    })
  });

  passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/github/callback"
    },
   function(accessToken, refreshToken, profile, done) {
      //find a user whose id is the same as the profile id
      //if the user doesnt exist, create new user entry
      knex('users').where('github_id', profile.id).then(user => {
        let userQuery;
        if (user.length === 0) {
          userQuery = knex('users').insert({
            name: null,
            email: null,
            github_username: profile.username,
            access_token: accessToken,
            avatar: profile._json.avatar_url,
            github_id: profile.id,
          }).returning('github_id')
        } else {
          userQuery = knex('users').where('github_id', profile.id).update({
            access_token: accessToken
          }). returning('github_id')
        }
        userQuery.then((github_id) => {
          return done(null, github_id[0]);
        })
      })
    }
  ));

};
