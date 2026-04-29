import User from '../models/user.model';

const findUserByEmail = (email) => User.findOne({ email });

const createUser = (userData) => User.create(userData);

module.exports = {
	findUserByEmail,
	createUser
};
