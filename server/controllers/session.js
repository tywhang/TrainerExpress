var sessionID;
module.exports = {
	get: function(req, res) {
		res.send({sessionID: sessionID})
	},

	set: function(req, res) {
		sessionID = req.body.sessionID
	},

	destroy: function(req, res) {
		sessionID = null
	}
}