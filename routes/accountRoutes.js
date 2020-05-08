const mongoose = require('mongoose');
const user = require('../models/User');
const User = mongoose.model('users');

module.exports = app => {
    app.get('/api/users', (req,res) =>{          //get all posts info from db
        User.find({},(err,doc)=>{
            if(doc)
                res.json(doc);
            else {
                res.err(err);
            }
        })
    });

    app.post('/api/addUser',(req,res)=>{        //add a new post
        const userObj = new User({
            username : req.body.username, 
            givenName : req.body.givenName, 
            familyName : req.body.familyName, 
            email : req.body.email, 
            password : req.body.password,
            picture: req.body.picture,
        })
        userObj.save((err)=>{
            if(err){
            console.log(err);
            res.send('Unable to save user data!');
            }
            else
            res.send('User data saved successfully!');
        })
    });

    app.get('/api/getuserDetails/:userid',(req,res)=>{              //get user details
        User.findOne({userId : req.body.userid},{},(err,doc)=>{
            if(doc)
                res.json(doc);
            else {
                res.status(404).send('Ops!Detail not found');
            }
        })
    });   

    app.post('/api/updateuser',(req,res)=>{          //update a post data
        User.findOneAndUpdate(
            {userId: req.body.userid},
            { $set:
                {
                    username : req.body.name,
                    givenName : req.body.givenName,
                    familyName : req.body.familyName,
                    email: req.body.email,
                    picture: req.body.picture
                }
            },(err,doc)=>{
            if(doc)
                res.send('User account updated successfully!');
            else {
                res.err(err.message);
            }
        })
    });

    app.delete('/api/deleteuser/:userid',(req,res)=>{           //delete a perticular user
        User.findOneAndRemove({_id : req.params.userid},{},(err,doc)=>{
            if(doc)
                res.json(doc);
            else {
                res.status(404).send('Ops! User not found');
            }
        })
    });
    }