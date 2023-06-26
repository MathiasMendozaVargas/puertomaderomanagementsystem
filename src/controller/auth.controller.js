///////////////////////////////////
//       Visits Controller
///////////////////////////////////

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const { response } = require("express");

// Getting user schema
const User = require('../model/user.model')


//////////////
// Functions
//////////////

// (GET) Get Login Page
exports.getLogin = (req, res, next) => {
    const session = req.session.isLoggedIn
    if(session){
        res.render('visits', {session: session})
    }else{
        res.render("login", {session: session});
    }
}

// (POST) Post Login with Credentials
exports.postLogin = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    let user = null
    if(username && password){
        // Get user from db
        let isEmail = false
        for(var i=0; i<username.length;i++){
            var letter = username[i]
            if(letter==='@'){
                isEmail = true
            }
        }
        if(isEmail){
            user = await User.findUserbyEmail(username)
        }
        else{
            user = await User.findUserbyUsername(username)
        }
        
        if(user){
            // Uncrypt Users password and compare
            bcrypt.compare(password, user.password)
            .then((passwordCheck) => {
                if(!passwordCheck){
                    console.log("Error");
                }

                // create JWWT token
                const token = jwt.sign(
                    {
                        userId: user._id,
                        userEmail: user.email
                    },
                    "RANDOM-TOKEN",
                    { expiresIn: "24h" }
                )

                // return success response
                req.session.isLoggedIn = true
                req.session.current_user = user
                res.redirect('/visits/all')

            })
            // catch error if password does not match
            .catch((error) => {
                console.log(error);
            });
        }else{
            console.log("Error");
        }
    }
}


// (GET) Get Sign Up Page
exports.getSignUp = (req, res) => {
    const session = req.session.isLoggedIn
    res.render('signup', {session: session})
}

// (POST) Creating New User with Credentials
exports.postSignUp = (req, res) => {
    const department = req.body.department
    const username = req.body.username
    const email = req.body.email
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const password = req.body.password
    const repeat_password = req.body.repeat_password
    const age = req.body.age
    const gender = req.body.gender

    if(department && username && email && firstName && lastName && password && repeat_password && age && gender){
        if(password === repeat_password){
            bcrypt.hash(password, 10)
                .then((hashedPassword) => {
                    const newUser = new User(department, username, email, firstName, lastName, hashedPassword, age, gender)
                    // saving user
                    newUser.save()
                        .then(() => {
                            res.redirect('/auth/login')
                        })
                        .catch((e) => {
                            console.log(e)
                        })
                })
                .catch((e) => {
                    response.status(500).send({
                        message: 'Password was not hashed successfully',
                        e
                    })
                })
        }
        else{
            console.log('Passwords do not match!')
        }
    }
    else{
        console.log('Please fill in all fields!')
    }
}

// (POST) Loging Out User...
exports.postLogout = (req, res) => {
    req.session.destroy((err) => {
        if(err){
            console.log(err)
        }
        else{
            res.redirect('/auth/login')
        }
    })
}