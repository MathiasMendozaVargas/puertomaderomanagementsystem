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
posts_router.route('/createGeneralPost').get(getCreateGeneralPost).post(postCreateGeneralPost)

module.exports = posts_router;