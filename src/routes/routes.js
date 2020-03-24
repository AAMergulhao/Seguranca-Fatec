const { Router } = require('express');
const sendEmail = require('../services/nodeMailer');

const authRoutes = require('./authRoutes');

const routes = Router();

routes.use('/auth', authRoutes);

routes.post('/sendEmail', (req, res) => {
    let { destiny } = req.body;
    res.send(sendEmail(destiny));
})
routes.get('/', (req, res) => {
    res.render('pages/login');
});

module.exports = routes;