//including our frameworks/libraries
var express                 = require("express"),
    methodOverride          = require("method-override"),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    app                     = express(),
    expressSanitizer        = require("express-sanitizer"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    passport                = require("passport"),
    User                    = require("./models/user"),
    Comment                 = require("./models/comment"),
    Blog                    = require("./models/blog"),
//Requiring Routes
    commentRoutes       = require("./routes/comments"),
    blogRoutes          = require("./routes/blogs"),
    indexRoutes         = require("./routes/index");

// APP Config


//Connecting Mongodb 
mongoose.connect("mongodb://localhost/BlogDB"); 

//Setting the view engine to ejs
app.set("view engine", "ejs"); 
//Using Express
app.use(express.static("public")); 
//Using body-parser
app.use(bodyParser.urlencoded({extended: true}));
//Using Sanitizer
app.use(expressSanitizer());
//Using MethodOverride
app.use(methodOverride("_method"));
//Using Epress-Session
app.use(require("express-session")({
    secret: "I am so POWERFUL",
    resave: false,
    saveUninitialized: false
}));
//Starting Pasport
app.use(passport.initialize());
//Using Passport Session
app.use(passport.session());

// Getting Curent user's username
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

//Using Routes
app.use(indexRoutes);
app.use(blogRoutes);
app.use(commentRoutes);
//Making Local Strategy,Serializing and Deserializing
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("server started......") 
});




