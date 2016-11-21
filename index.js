var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.listen(3001);

var session = require('express-session');
var sess = session(
  {
    secret: 'UH*&efh3*j8ey3e8',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 10000}
  }
);
app.use(sess);

app.use(function(req, res, next){

  if(req.session.daMuaVe == undefined || req.session.daMuaVe == false){
    req.session.daMuaVe = false;
  }else{
    req.session.daMuaVe++;
  }

  if(req.path == '/muave' && req.session.daMuaVe > 0){
    res.redirect('/vaorap');
    return false;
  }
    next();

});

app.get('/', function(req, res){
  res.render('homepage');
});

app.get('/muave', function(req, res){
  req.session.daMuaVe = 1;
  res.send('ban da mua ve');
});

app.get('/vaorap', function(req, res){
  if(req.session.daMuaVe){
    res.send('Welcome');
  }else{
    res.render('homepage');
  }
});
