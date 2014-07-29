var mongoose = require('mongoose'),
 User = mongoose.model('User');


module.exports = {
  index: function(req, res) {
    res.render('./../server/views/users/index', {title:'Welcome Page'});
  },
  index_json: function(req, res) { 
    User.find({}, function(err, results){
      res.send(JSON.stringify(results));
    });
  },
  create: function(req, res) {
    var user = new User(req.body);
    user.save(function(err){
      if(err){
        res.send(JSON.stringify(err));
      } else {
        res.send({ status: 'success', _id: user._id });
      }
    });
  },
  show: function(req, res) {
    var user = User.findOne({_id: req.params.id}, function(err, result) {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
  },
  edit: function(req, res) {
    res.render('./../server/views/users/edit', {title:'Welcome Page'});
  },
  login: function(req, res) {
    var user = User.findOne({username: req.body.username}, function(err, result) {
      if(err) {
        res.send(JSON.stringify(err));
      } else {
        if (result !== null) {
          if(result.password === req.body.password) {
            res.send({ status: 'success', _id: result._id })            
          } else {
            res.send({ status: 'fail', message: 'Invalid username/password combination'})
          }
        } else {
            res.send({ status: 'fail', message: 'Invalid username/password combination'})
        }
      }
    })

  }
}