var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

UserSchema.path('username').required(true, 'Username cannot be blank');
UserSchema.path('username').validate(function(username) {
	var alphaNumericRegex = /^[a-z0-9]+$/i;
	return alphaNumericRegex.test(username);
}, 'Username can only have numbers or letters')

UserSchema.path('email').required(true, 'Email cannot be blank');
UserSchema.path('email').validate(function (email) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email);
}, 'Email must be a valid email address.')
UserSchema.path('email').validate(function (value) {
	mongoose.model('User').findOne({ email: value }, function(err, results){
		if(results == null) {
			return 0;
		} else {
			return 1;
		}
	});
}, 'Email already exists')

UserSchema.path('password').required(true, 'Password cannot be blank');
UserSchema.path('password').validate(function (password) {
	return password.length > 5 && password.length < 21
}, 'Password must be between 6 and 20 characters');

// UserSchema.virtual('password_confirmation')
// .get(function() {
// 	return this.password_confirmation;
// }).set(function(value) {
// 	this.password_confirmation = value;
// });

// UserSchema.path('password').validate(function(val) {
// 	console.log("This is ")
// 	console.log(this.password !== this.password_confirmation)
// 	console.log("This is ", this);
// 	if (this.password !== this.password_confirm) {
// 		this.invalidate('password', 'Passwords must match')
// 	}
// })


mongoose.model('User', UserSchema);