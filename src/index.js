const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');

const {database, cookieKey} = require('./config/keys');

const routes = require('./routes/routes');

const app = express();

const PORT = process.env.PORT || 8088;

mongoose.connect(database.mongoUri,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('DB Connected!'))
.catch(err => {
console.log(Error, err.message);
});

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //Tempo de vida do cookie
    keys: [cookieKey]
}));

app.use(routes);

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'))

app.listen(PORT, (err)=>{
    if(!err){
        console.log('Server listening on', PORT);
    }else{
        console.log('Error:', err);
    }
});