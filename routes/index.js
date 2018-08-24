var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    passport    = require("passport"),
    User        = require("../models/user")


//Restful Routes
router.get("/", function (req, res){
    res.redirect("/blogs");
        
});



//=============
// Auth Routes
//=============


//Show SignUp Form
router.get("/register", function(req, res) {
    res.render('register');
})

//Handle User Signup 
router.post("/register", function(req, res){
   req.body.username
   req.body.password
   User.register(new User({username: req.body.username}), req.body.password, function(err, user){
      if(err){
          console.log(err);
          return res.render('register')
      } 
      passport.authenticate("local")(req, res, function(){
         res.redirect("/blogs"); 
      });
   });
});

// Show Login Form 
router.get("/login", function(req, res) {
    res.render('login')
})

// Login Logic
// middleware
router.post("/login", passport.authenticate("local",{
    successRedirect: "/blogs",
    failureRedirect: "/login"
}),function(req, res){
});

// Logout Logic
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});



module.exports = router