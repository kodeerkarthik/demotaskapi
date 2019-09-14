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

exports.userSignup = function(req, res){
  console.log(req.body)
    UserData.find({name: req.body.name},function(err, data){
      if(data != null && data != ''){
        res.send('User already exists');
      }
      else
      {
        var userData = new UserData(req.body);
        bcrypt.genSalt(10, function(err, salt){
          bcrypt.hash(userData.password, salt, function(err, hash) {
            userData.password = hash;
            userData.save(function(err, data){
              if(err)
                res.send(err.message);
              res.json(data);
            })
          })
        })
      }
    });
};

exports.userSignin = (req,res,next) =>{
  const name = req.body.name;
  const password = req.body.password;
  let loadedUser;
  UserData.findOne({name: name})
  .then(user =>{
    if(!user){
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    return bcrypt.compare(password,user.password);
  })
  .then(isEqual =>{
    if(!isEqual){
      const error = new Error('wrong password.');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
    {
      name: loadedUser.name,
      userId:loadedUser._id.toString()
    },'secret')
    return res.status(200).json({token: token, userId: loadedUser._id.toString(), email: loadedUser.email})
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }); 
}



