/////////////////////
// Posts Router 
/////////////////////

const posts_router = require('express').Router()

const {
    getAllGeneralPosts,
    getCreateGeneralPost,
    postCreateGeneralPost
} = require('../controller/posts.controller');

posts_router.get('/general', getAllGeneralPosts)
posts_router.get('/createGeneralPost', getCreateGeneralPost)

module.exports = posts_router;