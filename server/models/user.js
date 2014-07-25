var mongoose = require('mongoose')
var validate = require('mongoose-validator')
var uniqueValidator = require('mongoose-unique-validator')

var usernameValidator = [
	validate({
		validator: 'isAlphanumeric',
		message: 'Username can only have numbers or letters'
	})
]

var emailValidator = [
	validate({
		validator: 'matches',
		arguments: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/i,
		message: 'Email must be in valid format'
	})
]

var passwordValidator = [
	validate({
		validator: 'isLength',
		arguments: [6, 20],
		message: 'Password should be between 6 and 20 characters'
	})
]

var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, validate: usernameValidator, unique: true },
  email: { type: String, required: true, validate: emailValidator, unique: true },
  password: { type: String, required: true, validate: passwordValidator },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

UserSchema.plugin(uniqueValidator)

mongoose.model('User', UserSchema);