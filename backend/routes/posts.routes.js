const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .sort({created: -1})
      .populate('userId')
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts/add', async (req, res) => {
  const {author, title, text, price, phone, location, email, created, status, photo, description, updated, userId } = req.body
    try {
      const newPost = new Post({updated: updated, author: author, title: title, text: text, price: price, phone: phone, location: location, email: email, created: created, status: status, photo: photo, description: description, userId: userId} )
      await newPost.save()
      res.json(newPost)
    } catch(err) {
      res.status(500).json({message: err})
    }
})

router.put('/posts/update', async (req, res) => {
  const {_id, title, text, price, phone, created, status, photo, description, updated, userId } = req.body
    try {
      await Post.findOneAndUpdate({_id: _id}, { $set: {title:title, text:text, price:price, phone:phone, photo:photo, created:created, status:status, description:description, updated:updated, userId:userId}}, (a, post) => {
        if(!post){
            res.status(404).json({message: 'Not found'})
          } else {
            res.json(post)
          } 
        })
    } catch(err) {
      res.status(500).json({message: err})
    }
})

module.exports = router;
