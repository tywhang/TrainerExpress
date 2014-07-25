var mongoose = require('mongoose'),
 User = mongoose.model('User');


module.exports = {
 index: function(req, res){
  res.render('./../server/views/users/index', {title:'Welcome Page'});
 },
 index_json: function(req, res){ 
  User.find({}, function(err, results){
   res.send(JSON.stringify(results));
  });
 },
 create: function(req, res){
  var user = new User(req.body);
  user.save(function(err){
   if(err){
    res.send(JSON.stringify(err));
   }
   else
   {
    res.send({ status: 'success', _id: user._id });
   }
  });
 },
 show: function(req, res){
  res.render('./../server/views/users/show', {title:'Welcome Page'});
 },
 edit: function(req, res){
  res.render('./../server/views/users/edit', {title:'Welcome Page'});
 }
}