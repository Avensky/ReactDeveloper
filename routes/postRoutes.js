const post = require('../models/Post');

module.exports = app => {
  app.get('/posts', (req,res) =>{          //get all posts info from db
    post.find({},(err,doc)=>{
        if(doc)
            res.json({"Available posts" : doc});
        else {
            res.err(err);
        }
    })
  });

  app.post('/addPost',(req,res)=>{        //add a new post
    var postObj = new post({
        postTitle : req.body.posttitle,
        author : req.body.author,
        postId : req.body.postid,
        publisher : req.body.publisher,
        publishDate : req.body.publishdate
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

  app.get('/getpostDetails/:postid',(req,res)=>{              //get a post details
    post.findOne({postId : req.params.postid},{},(err,doc)=>{
        if(doc)
            res.json(doc);
        else {
            res.status(404).send('Ops!Detail not found');
        }
    })
  });

  app.post('/update',(req,res)=>{          //update a post data
    post.findOneAndUpdate({postId : req.body.postid},{$set:{publisher : req.body.publisher}},(err,doc)=>{
        if(doc)
            res.send('Post updated successfully!');
        else {
            res.err(err.message);
        }
    })
  });

  app.delete('/deletepost/:postid',(req,res)=>{           //delete a perticular post
    post.findOneAndRemove({postId : req.params.postid},{},(err,doc)=>{
        if(doc)
            res.json(doc);
        else {
            res.status(404).send('Ops! Post not found');
        }
    })
  });
}