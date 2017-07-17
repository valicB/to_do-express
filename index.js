const express = require('express');
const app = express();
const swig = require('swig'); //Template engines

// MIDDLEWARE
app.use(express.static('public'));

// CONFIG
app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views', __dirname + '/views');

//  disable CASHE
app.set('view cache', false); // express cache
swig.setDefaults({cache: false}); // swig cache

// ROUTING
app.get('/register', (req, res)=>{
  res.render('register-page');
});
app.get('/login', (req, res)=>{
  res.render('login-page');
})


app.get('/', (req, res)=> {
  res.render('homepage'); // show this template
});

app.listen(9090, function () {
  console.log('Express server app running on port 9090!');
});
