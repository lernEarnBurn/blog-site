const express = require('express')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const router = express.Router()

const User = require('../models/user')


router.post('/log-in', asyncHandler(async(req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!user) {
      return res.json('user not found')
    }
    if (!match) {
      return res.json('password is incorrect')
    }

    const token = jwt.sign({ user: user }, process.env.SECRET_KEY, {expiresIn: '1h'}, { algorithm: 'HS256' });
    res.json({token: token})
  } catch(err){
    console.log(err)
  }
}))



module.exports = router