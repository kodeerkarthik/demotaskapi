module.exports = function(app) {
	var userData = require('../controller/UserController');

	app.route('/signup')
		.post(userData.userSignup)
		.get(userData.getAllUsers)
	app.route('/signup/:userId')
		.get(userData.getUser)
	app.route('/signin')
		.post(userData.userSignin) 
	app.route('/update/:userId')
		.put(userData.updateUser);
	
};




