var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Comment     = require("../models/comment"),
    Blog        = require("../models/blog");


//Index Route
router.get("/blogs", function (req, res){
    Blog.find({}, function (err, blogs){ // adding index functionality to retrieve all blogs from database
        if (err) {
            console.log(err);
        } else {
            res.render("index", {blogs: blogs}); //blogs:blogs -> render index with data (blogs is the data)
        }
    });
});



//New Route
router.get("/blogs/new", isLoggedIn, function(req, res){
    res.render("new");// all we have to do is render b/c its new
});


//Create Route
router.post("/blogs", isLoggedIn, function(req, res){
   //create blog
   Blog.create(req.body.blog, function (err, newBlog){
       if(err) {
           res.render("new");
       } else {
           //if successful, redirect to index
           res.redirect("/blogs");
       }
   });
});




//Show Route
router.get("/blogs/:id", function(req, res){
	//Populate comments so they can show up on the Comment Section
   Blog.findById(req.params.id.populate("comments").exec(function(err, foundBlog){
       if (err) {
           res.redirect("/blogs");
       } else {
           res.render("show", {blog: foundBlog});
       }
   })
});
//Edit Route
router.get("/blogs/:id/edit", isLoggedIn, function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/");
		} else {
			res.render("edit", {blog: foundBlog});
		}
	});
});

//Update Route
router.put("/blogs/:id", isLoggedIn, function(req, res){
    // Check what data has arrived with body as a POST request
    // If null is returned, then error in edit.ejs file
    console.log("Title : " + req.body.blog.title + "\nImage URL : " + req.body.blog.image + "\nDescription : " + req.body.blog.body + "\n");
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
       if(err){
           // Check what error has occurred
           console.log(err);
           res.redirect("/blogs");
       }
       else {
           res.redirect("/blogs/" + req.params.id ); // Added a '/' to the URL that was missing
       }
   });
});


//Delete Route
router.delete("/blogs/:id", isLoggedIn,function(req, res){
	//destroy blog
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		} else{
			res.redirect("/blogs");
		}
	})
})


//Function to show Secret page only if user is logged in 
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router
