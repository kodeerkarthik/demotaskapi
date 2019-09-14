var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  name: {
    type: String,
    // required: 'Please Enter the name'
  },
  password: {
    type: String,
    // required: 'Please Enter the password'
  },
  place: {
    type: String,
    // required: 'Please Enter the place'
  },
  DOB: {
    type: String,
    // required: 'Please Enter Date Of Birth'
  }, 
  Created_date: {
    type: String,
    default: 'abc'
  }
});
module.exports = mongoose.model('UserInfo', UserSchema);

