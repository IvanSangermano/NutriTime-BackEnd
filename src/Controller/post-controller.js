const { request, response } = require('express');
const Post = require('../Model/post');

const getPosts = async (req = request, res = response) => {
  try {
    const { userId } = req.query;
    let termPost = {};

    if (userId) {
      termPost.name = userId;
    }

    const posts = await Post.find(termPost);
    res.send(posts);
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
    console.log(error);
  }
};

const getPost = async (req = request, res = response) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const postPost = async (req = request, res = response) => {
  try {
    const post = new Post(req.body);
    const postExist = await Post.findOne({
        userId : req.body.userId,
        date : req.body.date,
        description : req.body.description,
        likes : req.body.likes,
        type : req.body.type
    });
    if (postExist) {
      res.status(400).json({
        error: 'Error, existing post',
      });
    } else {
      await post.save();
      res.status(201).json({ message: 'Post added successfully', data: post });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const putPost = async (req = request, res = response) => {
  try {
    const postId = req.params.id;
    let post = req.body;

    const postExist = await Post.findOne({
        userId : req.body.userId,
        date : req.body.date,
        description : req.body.description,
        likes : req.body.likes,
        type : req.body.type,
        _id: { $ne: postId },
    });
    if (postExist) {
      return res.status(400).json({
        error: 'Error, existing post',
      });
    } else {
      user = await User.findByIdAndUpdate(postId, post, {
        new: true,
      });
    }
    if (post) {
      res.json({ message: 'Post modify successfully', data: post });
    } else {
      res.status(404).json({ error: 'Post doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const deletePost = async (req = request, res = response) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByIdAndDelete(postId);

    if (post) {
      res.json({ message: 'Post deleted successfully', data: post });
    } else {
      res.status(404).json({ error: 'Post doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

module.exports = {
    getPosts,
    getPost,
    postPost,
    putPost,
    deletePost
};
