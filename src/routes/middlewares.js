module.exports = {

    homeMiddleware(req,res,next){
        if(req.user){
            res.redirect('/profile');
        }
        next();
    },

    profileMiddleware(req, res, next){
        if(!req.user){
            res.redirect('/');
        }
        next();
    },
    
}