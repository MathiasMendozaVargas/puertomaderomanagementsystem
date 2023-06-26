/////////////////////
// Users Router 
/////////////////////

const users_router = require('express').Router()

const {
    getProfile,
    getEditProfile,
    postEditProfile,
    getTeam,
    getOtherProfile
} = require('../controller/users.controller')

users_router.get('/profile/:id', getOtherProfile)
users_router.get('/profile', getProfile)
users_router.route('/editProfile').get(getEditProfile).post(postEditProfile)
users_router.get('/team', getTeam)


module.exports = users_router;