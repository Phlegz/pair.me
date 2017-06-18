const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport');

module.exports = function(knex, passport) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/github/callback"
    },
   function(accessToken, refreshToken, profile, done) {
      knex('users').where('github_id', profile.id).then(user => {
        let userQuery;
        if (user.length === 0) {
          console.log('userid', user.id)
          userQuery = knex('users').insert({
            github_login: profile.username,
            github_avatar: profile._json.avatar_url,
            github_name: profile.displayName,
            github_id: profile.id,
            github_token: accessToken
          }).returning('github_id')
        } else {
          userQuery = knex('users').where('github_id', profile.id).update({
            github_token: accessToken
          }). returning('github_id')
        }
        userQuery.then((github_id) => {
          return done(null, github_id[0]);
        })
      })
    }
  ));


  // function ensureAuthenticated(req, res, next) {
  //   if (req.isAuthenticated()) { return next(); }
  //   res.redirect('/login')
  // }


  // app.get('/auth/github',
  //   passport.authenticate('github', { scope: [ 'user:email' ] }),
  //   function(req, res){
  //     // The request will be redirected to GitHub for authentication, so this
  //     // function will not be called.
  //   });

  // app.get('/auth/github/callback',
  //   passport.authenticate('github', { failureRedirect: '/login' }),
  //   function(req, res) {
  //     res.redirect('/dashboard');
  //   });

};
