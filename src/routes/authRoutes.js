const { Router } = require("express");
const passport = require("passport");

const githubStrategy = require("../services/githubStrategy");

const routes = Router();

githubStrategy(passport);

routes.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

routes.get("/github/callback", passport.authenticate("github"), (req, res) => {
  res.json(req.user);
});

module.exports = routes;
