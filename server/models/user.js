var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

UserSchema.path('username').required(true, 'Username cannot be blank');
UserSchema.path('email').required(true, 'Email cannot be blank');
UserSchema.path('password').required(true, 'Password cannot be blank');

mongoose.model('User', UserSchema);