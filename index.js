const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 80;
const app = express();

var login = "abc"
var password = "123"

app.use(session({
    secret: 'secretloginwithnode',
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: true}));

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) =>{
    if(req.session.login){
        res.render('logged', {login: req.session.login});
    } else {
        res.render('index');
    }
    
});

app.post('/', (req, res) =>{
    if(req.body.login == login && req.body.password == password){
        req.session.login = req.body.login;
    }
    res.redirect('/')
});

app.listen(port, ()=>{
    console.log(`Rodando na porta ${port}`)
    console.log(`http://localhost:${port}`)
});