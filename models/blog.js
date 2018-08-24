var mongoose  = require("mongoose");

//Schema Config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: 
        {type: Date, default: Date.now}, // check for the date as of the time the post was created
        
    comments: [
       {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
       }
       
       ]
});


//Mongoose model config
module.exports = mongoose.model("Blog", blogSchema);
