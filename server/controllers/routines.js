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

	routine: function(req, res) {
		var routine = Routine.findOne({ _id: req.body._id }, function(err, routine) {
			if (err) {
				console.log(err)
			} else {
				res.send(routine)
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
		var routines = Routine.find({ user_id: req.body.user_id }, function(err, routines) {
			if (err) {
				console.log(err)
			} else {
				res.send(routines)
			}
		})
	},

	update: function(req, res) {
		var routine = Routine.find({ _id: req.body._id })
		routine.update(
		{
			title: req.body.title,
			duration: req.body.duration,
			intensity: req.body.intensity,
			description: req.body.description,
			steps: req.body.steps,
			cycles: req.body.cycles,
			updated_at: new Date
		}, function(err, result) {
			if (err) {
				console.log(err)
			} else {
				res.send({ status: 'success' })
			}
		})
	},

	destroy: function(req, res) {
		var routine = Routine.remove({ _id: req.body._id }, function(err, routine) {
			if(err) {
				console.log(err)
			} else {
				// res.send({ status: 'success' })
			}
		})
	}
}