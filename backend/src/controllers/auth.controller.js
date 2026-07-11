const userModel = require("../models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
    try {
        const { username, email, password, role = "user" } = req.body;

        const userAlreadyExist = await userModel.findOne({
            $or: [{ username }, { email }],
        });

        if (userAlreadyExist) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = new userModel({
            username,
            email,
            password: hash,
            role,
        });

        await user.save();

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET
        );

        // set cookie (requires cookie-parser middleware in your app)
        res.cookie("token", token);

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("registerUser error:", err);
        return res.status(500).json({ message: "Server error" });
    }
}

async function loginUser(req, res){

    const {username,email, password}= req.body;

    const user= await userModel.findOne({
        $or: [{username}, {email }]
    })

    if(!user){
        return res.status(404).json({message: "Invalid Credentials"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(401).json({message: "Invalid Credentials"});
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET );
    
    res.cookie("token", token);

    res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })
}

async function logoutUser(req, res){
    res.clearCookie("token");
    res.status(200).json({message: "Logout successful"});
}

module.exports = { registerUser, loginUser , logoutUser};