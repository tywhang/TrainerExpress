var mongoose = require('mongoose'),
  Routine = mongoose.model('Routine')

module.exports = {
	create: function(req, res) {
		var routine = new Routine(req.body)
		routine.save(function(err) {
			if(err) {
				res.send(JSON.stringify(err))
			} else {
				res.send({ status: 'success' })
			}
		})
	},
	routines: function(req, res) {
		var routines = Routine.find({}, function(err, routines) {
			if (err) {
				console.log(err)
			} else {
				res.send(routines)
			}
		})
	},
	user_routines: function(req, res) {
		console.log('REQ.BODY', req.body)
		var routines = Routine.find({ user_id: req.body.user_id }, function(err, routines) {
			if (err) {
				console.log('error message: ', err)
			} else {
				console.log('routines', routines)
				res.send(routines)
			}
		})
	}
}