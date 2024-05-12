var express = require('express');
const userModel =require('./users');
const postModel =require('./post');
const passport = require('passport');
const localStrategy= require('passport-local');
const upload =require('./multer');
passport.use(new localStrategy(userModel.authenticate()));
var router = express.Router();

 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login',function(req,res,next){
res.render('login',{error:req.flash('error')});
});
router.get('/profile',isLoggedIn,async function(req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user
  })
  res.render('profile',{user:user});
});
router.get('/feed',function(req,res,next){
res.render('feed')
})
router.post('/upload',upload.single('file'),async function(req,res,next){
  if(!req.file){
    return res.status(404).send("file were not uploaded");
  } 

  const user =await userModel.findOne({username: req.session.passport.user});
  const post =await postModel.create({
    postText:req.body.caption,  
    image: req.file.fullname,
    user_id:user._id
  })
  user.posts.push(post._id);
  await user.save();
  res.send('post updated successfully');
   
  })
router.post('/register',function(req,res,next){

  const { username, fullname, email } = req.body;

const user = new userModel({username,fullname,email});
userModel.register(user,req.body.password)
.then(function(){
  passport.authenticate('local')(req,res,function(){
  res.redirect('/profile');
})});
});
router.post('/login',passport.authenticate('local',{
successRedirect:'/profile',
failureRedirect:'/login',
failureFlash:true
}),function(req,res){})
router.get('/logout',function(req,res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    //req.isAuthenticated() will return true if user is logged in
    next();
} else{
    res.redirect("/login");
}

}
module.exports = router;
