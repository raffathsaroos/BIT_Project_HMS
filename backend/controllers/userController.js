import userService from '../services/userService.js';

export const loginUser = async (req, res) => {

    try {

        // get user data
        const { email, password } = req.body;

        // validate empty fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // call service
        const user = await userService.loginUser(email, password);

        // send success response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const signupUser = async (req, res) => {

    try {

        // get user data
        const { email, password } = req.body;

        // validate empty fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // call service
        const user = await userService.signupUser(email, password);
		

        // send success response
        return res.status(201).json({
            success: true,
            message: "signup successful",
            user
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};