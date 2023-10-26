const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const Post = require('../models/post')


//add form validation
exports.createPost = asyncHandler(async(req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async(err, authData) => {
    if(err){
      res.sendStatus(403)
    }else{
      const post = new Post({
        author: authData.user,
        title: req.body.title,
        content: req.body.content
      })
      const result = await post.save()
      res.json(post)
    }
  })
})


exports.deletePost = asyncHandler(async(req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async(err, authData) => {
    if(err){
      res.sendStatus(403)
    }else{
      const deletePost = await Post.findByIdAndDelete(req.params.postId)
      res.json('deleted post')
    }
  })
})
