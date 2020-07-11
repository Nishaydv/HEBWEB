var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var router = express.Router();
var authenticate = require('../authenticate');
const cors=require('./cors');
router.use(bodyParser.json());

/* GET users listing. */
router.options('*',cors.corswithOptions,(req,res)=>{ res.statusCode(200);});
router.get('/',cors.corswithOptions,authenticate.verifyUser,(req, res, next)=>{
  User.find(req.query)
  .then((users)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(users);
  })
  .catch((err)=>{
    res.statusCode=500;
    res.setHeader('Content-Type','application/json');
    res.json({err:err});
  });
});


router.post('/signup',cors.corswithOptions, (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.name)
        user.name = req.body.name;
      if (req.body.penname)
        user.penname = req.body.penname;
      if(req.body.collegename)
        user.collegename = req.body.collegename;  
      if(req.body.collegeId)
        user.collegeId = req.body.collegeId;
      if(req.body.email)
        user.email = req.body.email;
      if(req.body.phonenumber)
        user.phonenumber=req.body.phonenumber;      
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});


router.post('/login',cors.corswithOptions,  (req, res,next) => {

  passport.authenticate('local',(err,user,info)=>{
     if(err)
     {
       return next(err);
     }
     if(!user){
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false, status: 'Login Unsuccessfull',err: info}); 
     }
     req.logIn(user,(err)=>{
       if(err){
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, status: 'Login Unsuccessfull',err: 'Could not login User'});
       }
     })
     var token = authenticate.getToken({_id: req.user._id});
     res.statusCode = 200;
     res.setHeader('Content-Type', 'application/json');
     res.json({success: true,token:token, status: 'Login succesfull'});
  
    }); (req,res,next);
 
  
});


router.get('/logout',cors.corswithOptions, (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});
//router.get('/facebook/token',passport.authenticate('facebook-token'),(req,res)=>{
  //if(req.user){
    //var token = authenticate.getToken({_id:req.user._id});
    //res.statusCode=200;
   //res.setHeader('Content-Type','application/json');
   //res.json({success:true,token:token,status: 'You are successfully logged in!'});

  //}
//})
router.get('/facebook/token',
  passport.authenticate('facebook-token'),
  function(req, res){
    if(req.user){
      var token = authenticate.getToken({_id:req.user._id});
      res.statusCode=200;
     res.setHeader('Content-Type','application/json');
     res.json({success:true,token:token,status: 'You are successfully logged in!'});
  }
})

router.get('/checkJWTToken',cors.corswithOptions,(req,res)=>{
  passport.authenticate('jwt',{session:false},(err,user,info)=>{
    if(err)
     return next(err);

   if(!user){
     res.statusCode=401;
     res.setHeader('Content-Type','application/json');
     return res.json({status:'JWT invalid',success:false,err: info});
   }
   else{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    return res.json({status:'JWT valid',success:true,user: info});
   }  
  })(req,res);
})
 
module.exports = router;
