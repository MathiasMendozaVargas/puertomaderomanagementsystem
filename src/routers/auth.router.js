/////////////////////
// Auth Router 
/////////////////////

const auth_router = require('express').Router()

const {
    getLogin,
    postLogin,
    getSignUp,
    postSignUp, 
    postLogout,
} = require('../controller/auth.controller')

auth_router.route('/login').get(getLogin).post(postLogin)
auth_router.route('/signup').get(getSignUp).post(postSignUp)
auth_router.route('/logout').get(postLogout)

module.exports = auth_router;