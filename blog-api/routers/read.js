const express = require('express')
const router = express.Router()

const postController = require('../controllers/postController')

router.get('/posts', postController.getAllPosts)

router.get('/posts/:postId', postController.getPost)


module.exports = router