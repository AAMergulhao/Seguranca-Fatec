const { Router } = require('express');
const User = require('../models/User');

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

routes.get('/tags', async(req,res) =>{
    let {tags} = await User.findById(req.query.id);
    res.json(tags);
})

routes.post('/tags', async(req,res) =>{
    if(req.body.tag.trim() == ""){
        res.json({status: 1, res: 'Campo em branco'});
        return;
    }
    let {tags} = await User.findById(req.body.id);
    var alreadyExists = 0;

    if(tags.length > 0){
        tags.forEach(tag => {
            if(tag == req.body.tag){
                alreadyExists = 1;
            }
        });

        if(alreadyExists == 0){
            tags.push(req.body.tag);
            await User.updateOne({_id: req.body.id},{tags: tags});
            res.json({status: 0, res: 'Tag inserida com sucesso'});
            return;
        }
        res.json({status: 1, res: 'Tag já Existe'});
        return;
    }

    tags.push(req.body.tag);
    await User.updateOne({_id: req.body.id},{tags: tags});
    res.json({status: 0, res: 'Tag inserida com sucesso'});
});

routes.delete('/tags', async(req,res) =>{
     let {tags} = await User.findById(req.query.id);
     tags = tags.filter(tag => (tag != req.query.tag));
     await User.updateOne({_id: req.query.id},{tags: tags}).catch(()=>{
         res.json({status: 1, res: 'Erro ao deletar a Tag'});
         return;
     });
     res.json({status: 0, res: 'Tag deletada com sucesso'});
});

module.exports = routes;