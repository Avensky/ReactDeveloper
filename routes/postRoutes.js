const post = require('../models/Post');
const mongoose = require('mongoose');
const Post = mongoose.model('posts');

module.exports = app => {
  app.get('/api/posts', (req,res) =>{          //get all posts info from db
    Post.find({},(err,doc)=>{
        if(doc)
            res.json(doc);
        else {
            res.err(err);
        }
    })
  });

  app.post('/api/addPost',(req,res)=>{        //add a new post
//    const { title, author, content} = req.body;
    const postObj = new Post({
        title : req.body.posttitle,
        author : req.body.author,
//        postId : req.body.postid,
        content : req.body.content,
        date : Date.now()
    })
    postObj.save((err)=>{
        if(err){
        console.log(err);
        res.send('Unable to save post data!');
        }
        else
        res.send('post data saved successfully!');
    })
  });

  app.get('/api/getpostDetails/:postid',(req,res)=>{              //get a post details
    post.findOne({postId : req.params.postid},{},(err,doc)=>{
        if(doc)
            res.json(doc);
        else {
            res.status(404).send('Ops!Detail not found');
        }
    })
  });   

  app.post('/api/update',(req,res)=>{          //update a post data
    post.findOneAndUpdate({postId : req.body.postid},{$set:{publisher : req.body.publisher}},(err,doc)=>{
        if(doc)
            res.send('Post updated successfully!');
        else {
            res.err(err.message);
        }
    })
  });

  app.delete('/api/deletepost/:postid',(req,res)=>{           //delete a perticular post
    post.findOneAndRemove({postId : req.params.postid},{},(err,doc)=>{
        if(doc)
            res.json(doc);
        else {
            res.status(404).send('Ops! Post not found');
        }
    })
  });
}