///////////////////////////////////
//       Users Controller
///////////////////////////////////

const session = require("express-session");
const Visit = require("../model/visit.model");
const User = require('../model/user.model')


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
exports.postEditProfile = (req, res) => {
  // data not to update
  const department = req.session.current_user.department
  const password = req.session.current_user.password

  // data to update
  const username = req.body.username
  const email = req.body.email
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const age = req.body.age
  const gender = req.body.gender

  if(username && email && firstName && lastName && age && gender){
    const user_to_update = new User(department, username, email, firstName, lastName, password, age, gender)
    // saving user
    user_to_update.updateByEmail(department, username, email, firstName, lastName, password, age, gender)
        .then(() => {
            res.redirect('/visits/profile')
        })
        .catch((e) => {
            console.log(e)
        })
  }
  else{
      alert('Please fill in all fields!')
  }
}


// (GET) Get Team Page
exports.getTeam = (req, res) => {
    const session = req.session.isLoggedIn
    if(session){
        const user_function = new User('a', 'a', 'a', 'a', 'a', 'a', 'a', 'a')
        user_function.getAllUsers()
        .then((all_users) => {
            res.render('team', {session: session, users: all_users})
        })
        .catch(() => {
             console.log("Error getting team")
         })
    }
    else{
        res.redirect('/auth/login')
    }
}

