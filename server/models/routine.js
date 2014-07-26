var mongoose = require('mongoose')
var validate = require('mongoose-validator')
var uniqueValidator = require('mongoose-unique-validator')

var titleValidator = [
	validate({
		validator: 'isAlphanumeric',
		message: 'Title can only have numbers of letters'
	})
]

var durationValidator = [
	validate({
		validator: 'isNumeric',
		message: 'Duration must be a number'
	})
]

var intensityValidator = [
	validate({
		validator: 'isNumeric',
		message: 'Intensity level must a number'
	})
]

var stepsValidator = [
	validate({
		validator: 'isLength',
		arguments: [0, 50],
		message: 'Max number of steps is 50'
	})
]

var cyclesValidator = [
	validate({
		validator: 'isNumeric',
		message: 'Number of cycles must be a number'
	})
]

var RoutineSchema = new mongoose.Schema({
	title: { type: String, required: true, validate: titleValidator },
	duration: { type: Number, required: true, validate: durationValidator },
	intensity: { type: Number, required: true, validate: intensityValidator },
	steps: { type: Array, required: true, validate: stepsValidator },
	cycles: { type: Number, required: true, validate: cyclesValidator },
	num_completed: { type: Number, required: true },
	user_id: { type: Number, required: true },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
})

RoutineSchema.plugin(uniqueValidator)

mongoose.model('Routine', RoutineSchema)