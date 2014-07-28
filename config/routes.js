var users = require('./../server/controllers/users.js');
var session = require('./../server/controllers/session.js');
var routines = require('./../server/controllers/routines.js');

module.exports = function Routes(app){
 app.get('/', function(req,res) {
 	res.render('./../server/views/index')
 });

 app.get('/users', function(req, res) {
 	users.index(req, res)
 });
 app.post('/users/create', function(req,res) {
 	users.create(req, res)
 });
 app.get('/users/:id', function(req,res) {
 	users.show(req, res)
 });
 app.get('/users/:id/edit', function(req,res) {
 	users.edit(req, res)
 });
 app.post('/users/login', function(req, res) {
 	users.login(req, res)
 });

 app.get('/session', function(req, res) {
 	session.get(req, res)
 });
 app.post('/session/create', function(req, res) {
 	session.set(req, res)
 });
 app.get('/session/destroy', function(req, res) {
 	session.destroy(req,res)
 });
 app.get('/routines', function(req, res) {
 	routines.routines(req, res)
 })
 app.post('/routines', function(req, res) {
 	routines.user_routines(req, res)
 })

 app.post('/routines/create', function(req, res) {
 	routines.create(req, res)
 })

 app.post('/routine', function(req, res) {
 	routines.routine(req, res)
 })

 app.post('/routine/change', function(req, res) {
 	routines.update(req,res)
 })

};