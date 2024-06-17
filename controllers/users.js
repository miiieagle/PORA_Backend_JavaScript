const userModel = require("../models/user");
const { signUpMsg } = require("../utils/emails/auth");
const StatusCodes = require("../utils/statusCodes");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken"); // Import the JWT utility

const signUp = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: false,
                msg: "Email and password are required",
            });
        }

        const userExists = await userModel.findOne({ email: email });
        if (userExists) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: false,
                msg: "User already exists",
            });
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        console.log("Password:", password);
        console.log("Salt:", salt);

        const hashedPassword = await bcrypt.hash(password, salt);

        const saveUser = await userModel.create({
            email: email,
            password: hashedPassword,
        });

        await signUpMsg(email);

        const token = generateToken(saveUser); // Generate JWT

        return res.status(StatusCodes.CREATED).json({
            status: true,
            msg: "Account created successfully",
            data: saveUser,
            token, // Include token in response
        });
    } catch (error) {
        console.error('Error signing up user:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            msg: "Internal server error",
        });
    }
};

const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userExists = await userModel.findOne({ email: email });

        if (!userExists) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: false,
                message: "User account not found, please sign up",
            });
        }

        // Add logging to debug values
        console.log('Password:', password);
        console.log('User Password Hash:', userExists.password);

        if (!password || !userExists.password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: false,
                message: "Password is required",
            });
        }

        const passwordMatches = await bcrypt.compare(password, userExists.password);
        if (!passwordMatches) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: false,
                message: "Incorrect password",
            });
        }

        const token = generateToken(userExists); // Generate JWT

        return res.status(StatusCodes.OK).json({
            status: true,
            message: "Signed in successfully",
            data: userExists,
            token, // Include token in response
        });
    } catch (error) {
        console.error('Error signing in user:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            msg: "Internal server error",
        });
    }
};

module.exports = { signUp, signIn };
