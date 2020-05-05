const post = require('../models/Post');
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {
    app.post('/api/addUser',(req,res)=>{        //add a new user
        const userObj = new User({
            name : req.body.name,
            givenName : req.body.givenName,
            familyName : req.body.familyName,
            email: req.body.email,
            picture: req.body.picture
        })
        userObj.save((err)=>{
            if(err){
            console.log(err);
            res.send('Unable to add new user data!');
            }
            else
            res.send('User data saved successfully!');
        })
    });

    app.get('/api/getuserDetails/:userid',(req,res)=>{              //get user details
        user.findOne({userId : req.params.userid},{},(err,doc)=>{
            if(doc)
                res.json(doc);
            else {
                res.status(404).send('Ops!Detail not found');
            }
        })
    });   

    app.post('/api/updateuser',(req,res)=>{          //update a post data
        user.findOneAndUpdate({name : req.body.name},{givenName : req.body.givenName},{familyName : req.body.familyName},{email: req.body.email},{picture: req.body.picture},(err,doc)=>{
            if(doc)
                res.send('User account updated successfully!');
            else {
                res.err(err.message);
            }
        })
    });

    app.delete('/api/deleteuser/:userid',(req,res)=>{           //delete a perticular user
        user.findOneAndRemove({userId : req.params.userid},{},(err,doc)=>{
            if(doc)
                res.json(doc);
            else {
                res.status(404).send('Ops! User not found');
            }
        })
    });
    }