var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Comment     = require("../models/comment"),
    Blog        = require("../models/blog")


// ====================
//    Comments Routes
// ====================


router.get("/blogs/:id/comments/new", isLoggedIn, function(req, res){
    // find blog by id
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {blog: blog});
        }
    })
});


router.post("/blogs/:id/comments", function(req,res){
   //Lookup blog using ID
   Blog.findById(req.params.id, function(err, blog) {
      if(err){
          console.log(err);
          res.redirect("/blogs")
      } else{
          Comment.create(req.body.comment, function(err, comment){
              if(err){
                  console.log(err);
              } else{
                  blog.comments.push(comment);
                  blog.save();
                  res.redirect("/blogs/"+ blog._id);
              }
          });
      }
      
   });
   //Create new comment
   //Connect new comment to blog
   //Redirect to blog show page
});
//Function to show Secret page only if user is logged in 
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router