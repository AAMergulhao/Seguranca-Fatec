const GitHubStrategy = require('passport-github2');
const {auth} = require('../config/keys');
const User = require('../models/User');

module.exports = (passport) =>{
    
     passport.serializeUser((user, done) => {
         done(null, user.id);
     });

     passport.deserializeUser((id, done) => {
         User.findById(id).then((user) =>{
             done(null, user);
         })
        
     });

    passport.use(new GitHubStrategy({
        clientID: auth.githubClientPublic,
        clientSecret: auth.githubClientSecret,
        callbackURL: auth.githubCallbackUrl
    }, async (accessToken, refreshToken, profile, done) => {
         let {_json} = profile;
         let user = await User.findOne({githubId: profile.id});

         if(!user){
             user = await User.create({
                 githubId: profile.id,
                 username: profile.username,
                 name: profile.displayName,
                 avatar: _json.avatar_url,
                 location: _json.location,
                 bio: _json.bio,
                 github_url: profile.html_url,
                 repositories: _json.public_repos
             })
         }
        return done(null, user);
    }))
}