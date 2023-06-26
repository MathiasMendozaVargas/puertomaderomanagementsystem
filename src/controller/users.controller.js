///////////////////////////////////
//       Users Controller
///////////////////////////////////

const session = require("express-session");
const Visit = require("../model/visit.model");
const User = require('../model/user.model')
const Toastify = require('toastify-js');
const { response } = require("express");


/////////////
// Functions
/////////////

// (GET) Get Profile
exports.getProfile = (req, res) => {
  const session = req.session.isLoggedIn
  if(req.session.isLoggedIn){

    const user = req.session.current_user
    res.render('profile', {model: {}, session: session, user: user})
  }
  else{
    res.redirect('/auth/login')
  }
}


// (GET) Edit Profile
exports.getEditProfile = (req, res) => {
  const session = req.session.isLoggedIn
  if(req.session.isLoggedIn){
    const user = req.session.current_user
    res.render('editProfile', {model: {}, session: session, user: user})
  }
  else{
    res.redirect('/auth/login')
  }
}

// (POST) Edit Profile
exports.postEditProfile = async (req, res) => {
  // data not to update
  const user_id = req.session.current_user._id

  // data to update
  const username = req.body.username
  const email = req.body.email
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const age = req.body.age
  const gender = req.body.gender

  if(user_id, username && email && firstName && lastName && age && gender){
    // updating user
    try {
      await User.updateByEmail(user_id, username, email, firstName, lastName, age, gender)
      console.log('Updated!');
      
      // redirecting after a few seconds
      setTimeout(async function(){
        const new_current_user = await User.findUserbyEmail(email)
        if(new_current_user){
          req.session.current_user = new_current_user;
          res.redirect('/users/profile')
        }}, 3000)
    } catch (error) {
      console.log(error);
    }
  }
  else{
      alert('Please fill in all fields!')
  }
}


// (GET) Get Team Page
exports.getTeam = async (req, res) => {
    const session = req.session.isLoggedIn
    if(session){
        try {
          const team = await User.getAllUsers()
          if(team){
            const salesTeam = []
            const marketingTeam = []
            const accountingTeam = []
            const adminTeam = []

            for(var i=0; i<team.length; i++){
              console.log(team[i].department);
              if(team[i].department === 'Sales'){
                salesTeam.push(team[i])
              } else if(team[i].department === 'Marketing'){
                marketingTeam.push(team[i])
              } else if(team[i].department === 'Accounting'){
                accountingTeam.push(team[i])
              } else if(team[i].department === 'Admin'){
                adminTeam.push(team[i])
              }
            }
            console.log(salesTeam);
            console.log(marketingTeam);
            console.log(accountingTeam);
            console.log(adminTeam);
            res.render('team', {session: session, salesTeam: salesTeam, marketingTeam: marketingTeam, accountingTeam: accountingTeam, adminTeam: adminTeam})
          }
          else{
            console.log("Couldnt find Users");
          }
        } catch (error) {
          res.redirect('/visits/all')
        }
    }
    else{
        res.redirect('/auth/login')
    }
}

// (GET) Get other User Profile (Not the one logged In)
exports.getOtherProfile = async (req, res) => {
  const session = req.session.isLoggedIn
  if(req.session.isLoggedIn){
    const user = req.session.current_user
    const other_user_id = req.params.id
    console.log(other_user_id);
    const other_user = await User.findUserbyId(other_user_id)
    console.log(other_user);
    res.render('otherUser', {model: {}, session: session, other_user: other_user})
  }
  else{
    res.redirect('/auth/login')
  }
}
