const { Router } = require('express');
const sendEmail = require('../services/nodeMailer');

const authRoutes = require('./authRoutes');
const {profileMiddleware, homeMiddleware} = require('./middlewares');

const routes = Router();

routes.use('/auth', authRoutes);

routes.post('/sendEmail', (req, res) => {
    let { destiny } = req.body;
    res.send(sendEmail(destiny));
})

routes.get('/', homeMiddleware, (req, res) => {
    res.render('pages/login');
});

routes.get('/profile', profileMiddleware, (req,res) =>{
    res.render('pages/profile',{profile: req.user});
});

routes.get('/logout', (req,res) =>{
    req.logout();
    res.redirect('/');
});

module.exports = routes;