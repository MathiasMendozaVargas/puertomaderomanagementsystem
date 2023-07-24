///////////////////////////////////
//       Posts Controller
///////////////////////////////////

const session = require("express-session");
const User = require('../model/user.model')
const GeneralPost = require('../model/generalpost.model')

// importing modules
const fs = require('fs')
const path = require('path')

//////////////
// Functions
//////////////

// (GET) Get all General Posts
exports.getAllGeneralPosts = (req, res) => {
  if(req.session.isLoggedIn){
    const session = req.session.isLoggedIn
    const user = req.session.current_user
    GeneralPost.getAllGeneralPosts()
    .then((generalposts) => {
      console.log(generalposts);
      res.render("generalposts", { generalposts: generalposts, session: session, user: user });
    })
    .catch((err) => console.error(err.message));
  }else{
    res.redirect('/auth/login')
  }
};
 

// (GET) Get Create General Post page
exports.getCreateGeneralPost = (req, res) => {
  const session = req.session.isLoggedIn
  const user = req.session.current_user
  if(req.session.isLoggedIn){
    res.render("createGeneralPost", { session: session, user: user });
  }else{
    res.render('login', {session: session})
  }
};

