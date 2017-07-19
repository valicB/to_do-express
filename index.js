const express     = require('express');     // library
const app         = express();              // application
const swig        = require('swig');        //Template engines
const bodyParser  = require("body-parser"); // process post/get data
const expressValidator = require('express-validator');



// MIDDLEWARE
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded
app.use(expressValidator());

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
});

app.post('/user/create', (req, res)=>{
  // var fullname  = req.body.fullname;
  // var email     = req.body.email;
  // var password  = req.body.password;
  // var cpassword = req.body.cpassword;

  req.check({
   'email': {
      notEmpty: true,
      isEmail: {
        error_email: 'Invalid Email'
      }
    }
  });
  // De facut cu Result IP
  req.assert('email', 'required').notEmpty();
  req.assert('email', 'valid email required').isEmail();
  req.assert('password', '6 to 20 characters required').len(6, 20);

  req.getValidationResult().then(function(result) {
    // De validat cu if si else
    if (result.isEmpty()) {
      res.send('All goods');
    } else {res.send('hahaha');}

  });
  // if(fullname.length < 3){
  //   // error
  //   res.render('register-page', {error_fullname : 'Fullname must be at least 3 symbols'});
  // } else if (email.length < 3) {
  //   res.render('register-page', {error_email : 'Email must be at least 3 symbols'});
  // }else if (password.length < 3) {
  //   res.render('register-page', {error_password : 'Password must be at least 3 symbols'});
  // }else if (password != cpassword) {
  //   res.render('register-page', {error_cpass : 'The password must be the same'});
  // }
  //  else{
  //   res.send('All goods');
  // }

  /// 1) sanitization
  /// 2) validation
  /// 3) save to database

  // console.log(req.body);

});


app.get('/', (req, res)=> {
  res.render('homepage'); // show this template
});

app.listen(9090, function () {
  console.log('Express server app running on port 9090!');
});
