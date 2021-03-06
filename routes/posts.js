const router = require('express').Router();

const User = require('../models/User');
const Post = require('../models/Post');

// create new post
router.post('/', async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    desc: req.body.desc,
    photo: req.body.photo,
    username: req.body.username,
    categories: req.body.categories,
  });
  try {
    let result = await newPost.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json({ updatedPost });
      } catch (err) {}
    } else {
      res.status(401).json('You can update only your post ');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json('Post has been deleted');
      } catch (err) {}
    } else {
      res.status(401).json('You can delete only your post ');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    !post && res.status(404).json(`no post with id: ${req.params.id}`);
    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all posts
router.get('/', async (req, res) => {
  const username = req.query.username;
  const catName = req.query.category;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find({});
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
