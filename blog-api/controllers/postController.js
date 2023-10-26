const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const Post = require('../models/post')
const Comment = require('../models/comment')


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
      const deletePostComments = await Comment.deleteMany({post: req.params.postId})
      res.json('deleted post')
    }
  })
})

exports.getAllPosts = asyncHandler(async(req, res, next) => {
  try {
    const allPosts = await Post.find({})
    res.json(allPosts)
  } catch(err){
    res.json(err)
  }
})

exports.getPost = asyncHandler(async(req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId)
    const postComments = await Comment.find({post: req.params.postId})

    const response = {
      post: post,
      postComments: postComments,
    };

    res.json(response)
  } catch(err){
    res.json(err)
  }
})
