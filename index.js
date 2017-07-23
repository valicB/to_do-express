const express     = require('express');     // library
const app         = express();              // application
const swig        = require('swig');        //Template engines
const bodyParser  = require("body-parser"); // process post/get data
const expressValidator = require('express-validator');
const cookieSession = require('cookie-session');


// MIDDLEWARE
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded
app.use(expressValidator());
app.use(cookieSession({
  name: 's3Cur3',
  keys: ['nizYm70O4Pqwg1LE1'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

// CONFIG
app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views', __dirname + '/views');

//  disable CASHE
app.set('view cache', false); // express cache
swig.setDefaults({cache: false}); // swig cache

// ROUTING
app.get('/create', (req, res)=>{
  res.render('create-task', {onLine: req.session.is_online, fullname: req.session.fullname});
});
app.get('/register', (req, res)=>{
  res.render('register-page', {onLine: req.session.is_online, fullname: req.session.fullname});
});
app.get('/login', (req, res)=>{
  res.render('login-page', {onLine: req.session.is_online, fullname: req.session.fullname});
});
app.get('/user/logout', (req, res)=>{
  // res.session = null;
  req.session.is_online = null
  res.redirect('/');
});
app.post('/task/new', (req, res)=>{
  res.send('Task was create');
});
app.get('/tasks', (req, res)=>{
  res.render('all-tasks', {onLine: req.session.is_online, fullname: req.session.fullname});
});

app.post('/user/create', (req, res)=>{
  // var fullname  = req.body.fullname;
  // var email     = req.body.email;
  // var password  = req.body.password;
  // var cpassword = req.body.cpassword;

  req.assert('fullname', 'Fullname is required').notEmpty();
  req.assert('email', 'Email is required').notEmpty();
  req.assert('email', 'Invalid email').isEmail();
  req.assert('password', '6 to 20 characters required').len(6, 20);
  req.assert('cpassword', 'Passwords must match').equals(req.body.password);

  req.getValidationResult().then(function(result) {

    // console.log(result.isEmpty());
    if (!result.isEmpty()) {
      // console.log(result.array()[0].param);
      // console.log(result.array()[0].msg);
      res.render('register-page', {error : result.array()[0].msg});
    } else res.send('User was created');
  });
});

app.post('/user/login', (req, res)=>{
  var fullname  = req.body.fullname;
  var email     = req.body.email;
  var password  = req.body.password;

  req.assert('fullname', 'Fullname is required').notEmpty();
  req.assert('password', '6 to 20 characters required').len(6, 20);

  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      res.render('login-page', {error : result.array()[0].msg});
    } else {
        if (
          fullname == "admin" && password == "1234567" ||
          fullname == "admin1" && password == "1234567"
      ){
          req.session.is_online = true;
          req.session.fullname = fullname;
          res.redirect('/');
        } else res.render('login-page', {error : 'Bad fullname or password'});
      }
  });
});

app.get('/', (req, res)=> {
  res.render('homepage', {name: "Express", onLine: req.session.is_online, fullname: req.session.fullname}); // show this template
});

app.listen(9090, function () {
  console.log('Express server app running on port 9090!');
});
