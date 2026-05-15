import userDao from '../dao/userDao.js';

const loginUser = async (email, password) => {

const user = await userDao.getUserByEmail(email);
		
if (!user) {
            throw new Error("User not found!");
        }
	
if (user.password !== password) {
            throw new Error("Invalid Password!");
        }
		
return {
            id: user._id,
            email: user.email,
            role: user.role
        };
	
}
	



const signupUser = async (email, password) => {

const existingUser = await userDao.getUserByEmail(email);
		
if (existingUser) {
        throw new Error("User already exists!");
    }

        
		
return await userDao.createUser({
            email,
            password, 
           
        });
	
}
	
	
const userService = {
    loginUser,
	signupUser
};	
	
export default userService;  
