var express = require('express');
var router = express.Router();

const userModel = require("./users");
const hackathonModel = require("./hackathon")
const passport = require("passport");
const localStrategy = require('passport-local');

passport.use(new localStrategy(userModel.authenticate()));


router.get('/', function(req, res, next) {
  res.redirect("/login")
});

router.get('/login', function(req, res, next) {
  res.render('login',{error: req.flash('error')});
});

router.get('/about', function(req, res, next) {
  var show = false;
  if(req.isAuthenticated()){
         show = true; 
  }
  res.render('about',{show: show});
});

router.get('/find', isLoggedIn, async function(req, res, next) {
  const all = await userModel.find();
  res.render('find', {users:all});
});

router.get('/hackathon', isLoggedIn, async function(req, res, next) {
  const hackathons = await hackathonModel.find({ date: { $gte: new Date() } });
  res.render('hackathon',{hackathons: hackathons});
});

router.post('/login', passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/login",
  failureFlash: true,
}), function(req, res, next) {
});

router.get('/logout', function(req,res){
  req.logout(function(err){
    if(err) {
      return next(err);
    }
    res.redirect('/login');
  })
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect("/login");
}

router.get('/register', function(req, res, next) {
  res.render('register',{error: req.flash('error')});
});

router.post("/register", function(req, res){
  const userData = new userModel({
    username: req.body.username,
    email: req.body.email,
    fullname: req.body.fullname,
  });

  userModel.register(userData, req.body.password)
  .then(function(registeruser){
    passport.authenticate("local") (req,res, function(){
      res.redirect('/home');
    })
  })
  });

router.get('/update',isLoggedIn, async function(req, res, next) {
  const user = await userModel.findOne({username: req.session.passport.user});
  res.render('update',{user:user});
});

router.post('/update', isLoggedIn, async function(req, res, next) {
  const update = await userModel.findOneAndUpdate({username: req.session.passport.user},{
    fullname:req.body.fullname,
    gender:req.body.gender,
    college:req.body.college,
    branch: req.body.branch,
    github: req.body.github,
    skills: req.body.skills.split(","),
    year: req.body.year,
    linkedin: req.body.linkedin,
    role: req.body.role,
    updatedAt: new Date(),
  });
  res.redirect("home");

});

router.post('/upload-profile-image',isLoggedIn, async function(req, res) {
  const img = req.body.img;
  const update = await userModel.findOneAndUpdate({username: req.session.passport.user},{img: img});
  res.redirect("update");
});

router.get('/status',isLoggedIn,async function(req, res, next){
  const user = await userModel.findOne({username: req.session.passport.user});
  req.session.info = {status: user.status};
  res.json({status: req.session.info})
})

router.post('/status', isLoggedIn, async function(req, res, next) {
  const update = await userModel.findOneAndUpdate({username: req.session.passport.user},{status: req.body.status});
  req.session.info = {status: req.body.status};

  res.redirect("home");
});

router.get('/home', function(req, res, next) {
  var show = false;
  if(req.isAuthenticated()){
         show = true; 
  }
  res.render('home',{show: show});
});

router.get('/create-hackathon-passwordhaibahotkhatarnak', function(req, res, next) {
  res.render('create-hackathon');
});

router.post('/create-hackathon',async function(req,res){
  const {
    title,
    date,
    location,
    Description,
    registrationDeadline,
    prizes,
    tools,
    mentorsAvailable,
    contactEmail,
    registrationLink,
    teamsize,
    img,
  } = req.body;

  const newHackathon =  new hackathonModel({
    title,
    date,
    location,
    Description,
    registrationDeadline,
    prizes,
    tools: tools,
    mentorsAvailable,
    teamsize,
    contactEmail,
    registrationLink
  });

  await newHackathon.save();
  res.redirect("/hackathon")
})


module.exports = router;
