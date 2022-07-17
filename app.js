//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { application } = require("express");
const _ = require("lodash");

const homeStartingContent = "Welcome to The Daily Jouranal,to know more about what you can do with this website just tap on the about us option and proceed further as directed.";
const aboutContent = "Glad to see you here, you can go to compose sub-webpage and there can type a title and content related to that.And then when you submit it you will be re-directed to the home page containing you title and content also and when you will tap on readmore button which is in content end you will be send to a new and complete webpage of your inputs which are title and contents.";
const contactContent = "You can contact us at +91-95827411111,95827422222 or can easily connect me with the email: sidhant4688@gmail.com.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
let posts = [];


app.get("/",function(req,res){
  res.render('home',{StartingFiles:homeStartingContent,
    posts: posts
  });
});

app.get("/about",function(req,res){
  res.render('about',{about:aboutContent});
});
app.get("/contact",function(req,res){
  res.render('contact',{contact:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  const post={
    title: req.body.postTitle,
    content: req.body.postBody
    
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req,res){
  const requestedTitle=_.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const title =_.lowerCase(post.title);
    if (title === requestedTitle){
      res.render('post',{
        title: post.title,
        content: post.content
      });
    
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
