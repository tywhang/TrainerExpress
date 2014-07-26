var mongoose = require('mongoose'),
  Routine = mongoose.model('Routine')

module.exports = {
	create: function(req, res) {
		var routine = new Routine(req.body)
		routine.save(function(err) {
			if(err) {
				res.send(JSON.stringify(err))
			} else {
				console.log('Success!')
			}
		})
	}
}