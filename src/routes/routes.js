const {Router} = require('express');

const authRoutes = require('./authRoutes');

const routes = Router();

routes.use('/auth', authRoutes);


routes.get('/', (req,res) =>{
    res.send('BackEnd API')
});

routes.get('*', (req,res) =>{
    res.json({message: 'Cannot Get'})
});

routes.post('*', (req,res) =>{
    res.json({message: 'Cannot Post'})
});

module.exports = routes;