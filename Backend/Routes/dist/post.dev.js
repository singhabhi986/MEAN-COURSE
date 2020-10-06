"use strict";

var express = require("express");

var router = express.Router();

var Post = require("../models/post");

router.post("", function (req, res, next) {
  //const post = req.body;
  var post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  post.save().then(function (createPost) {
    res.status(201).json({
      message: "Post added succesfully",
      postId: createPost._id
    });
  });
});
router.get("/:id", function (req, res, next) {
  Post.findById(req.params.id).then(function (post) {
    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(404).json({
        message: "Post not Found"
      });
    }
  });
}); //YOU CAN USE PUT TO TOTALY REPLACE OR YOU CAN USE PATH TO JUST UPDATE

router.put("/:id", function (req, res, next) {
  var post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({
    _id: req.params.id
  }, post).then(function (result) {
    console.log(result);
    res.status(200).json({
      message: "Update Successful"
    });
  });
});
router["delete"]("/:id", function (req, res, next) {
  Post.deleteOne({
    _id: req.params.id
  }).then(function (result) {
    console.log(result);
  })["catch"](function () {
    console.log('cant delete');
  });
  console.log(req.params.id);
  res.status(200).json({
    message: 'Deleted'
  });
});
router.use("", function (req, res) {
  //NOW WE WILL FETCH FROM DATABASE AS
  Post.find().then(function (documents) {
    res.status(200).json({
      message: 'Post fetched properly',
      posts: documents
    }); //console.log(documents);
  }); //res.end('fetched properly');

  /* const posts = [{
      id: 'sfljsflkjslajf',
      title: 'First server-side post',
      content: 'this is coming from Backend server'
    },
    {
      id: 'sfljslajf',
      title: 'Second server-side post',
      content: 'This is coming from server!'
    }
  ];
  res.status(200).json({
    message: 'Post fetched properly',
    posts: posts
  }); */
});
module.exports = router;