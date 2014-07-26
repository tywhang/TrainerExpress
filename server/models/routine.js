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

var descriptionValidator = [
	validate({
		validator: 'isLength',
		arguments: [0, 256],
		message: 'Max number of characters is 256'
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
	description: { type: String, required: true, validate: descriptionValidator },
	steps: { type: Array, required: true, validate: stepsValidator },
	cycles: { type: Number, required: true, default: 0, validate: cyclesValidator },
	num_completed: { type: Number, required: true, default: 0 },
	user_id: { type: String, required: true },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
})

RoutineSchema.plugin(uniqueValidator)

mongoose.model('Routine', RoutineSchema)