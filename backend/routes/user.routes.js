const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

router.get('/user', async (req, res) => {
    try {
        const result = await User.find()
            res.json(result)

    } catch(err) {
        res.status(500).json(err);
      }
})


router.get('/login', async (req, res) => {
  try {      
    const googleUser = await req.user
    if(!googleUser) {
        res.status(404).json({message:'Not found'})   
    } else {
        const appUser = await User.findOne({emails: googleUser.emails[0].value})
        if(!appUser) {
            const newAppUser = new User({user: googleUser.displayName, emails: googleUser.emails[0].value, isLogged: true})
            await newAppUser.save()
            const token = jwt.sign({user:googleUser.emails[0].value},'key_key_key')
            res.cookie('userName', token, {maxAge: 7200000, httpOnly: false})
            return res.status(200).redirect('http://localhost:3000')
        } else {
            appUser.isLogged = true
            await appUser.save()
            const token = jwt.sign({user:googleUser.emails[0].value},'key_key_key')
            res.cookie('userName', token, {maxAge: 7200000, httpOnly: false})
            return res.status(200).redirect('http://localhost:3000')
        }
    }
}
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/logout', async (req, res) =>{
    try {      
        const googleUser = await req.user
        if(!googleUser) {
            res.redirect('http://localhost:3000')
        } else {
            const appUser = await User.findOne({emails: googleUser.emails[0].value})
            if(!appUser) {
                res.status(404).json({message: 'user not exist'})
            } else {
                appUser.isLogged = false
                await appUser.save()
                res.clearCookie('userName')
                return res.redirect('http://localhost:3000');
            }
        }
    }
      catch(err) {
        res.status(500).json(err, '500');
      }
  });

module.exports = router;