var mongoose = require('mongoose'),
UserData = mongoose.model('UserInfo');

var bcrypt = require('bcryptjs');
var jwt=require('jsonwebtoken');

var isAuth=require('../Middleware/isAuth');



exports.getAllUsers = function(req, res) {
  UserData.find({}, function(err, details) {
    if (err)
      res.send(err);
    res.json(details);
  });
};

exports.getUser = function(req, res){   
  UserData.find({_id: req.params.userId},
    function(err, data){
      if (err)
        res.send(err);
      res.json(data);
    });
};

exports.userSignup = function(req, res) {
  console.log('signup')
  UserData.find({name: req.body.name},function(err, data){
    if(data != null && data != ''){
      res.send('User already exists');
    }
    else {
      var userData = new UserData(req.body);
      userData.save(function(err, data){
        if(err)
          res.send(err.message);
        res.send("Register Sucessfully");
      });
    }
  })
};


exports.userSignin = function(req,res){
  UserData.find({name: req.body.name}, function(err, data){
    if(data != null && data != ''){
      if(req.body.password == data[0].password){
          // res.status(200).json(data);
          res.send("Login Succesfully");
        }else{
          res.send("Password does not matched");
        }
    } else{
      res.send("User does not exists");
    }
  });
};

exports.updateUser = function(req, res) {
  console.log(req.data)
  UserData.findOneAndUpdate({_id: req.params.userId}, 
    req.body, {new: true}, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};


