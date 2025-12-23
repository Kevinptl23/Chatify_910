import {catchAsyncError} from '../middleware/catchAsyncError.middleware.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/jwtToken.js';
import {v2 as clodinary} from 'cloudinary'

export const signup = catchAsyncError( async (req, res, next) => {
    const {fullName, email, password} = req.body;

    if(!fullName || !email || !password){
        return res.status(400).json({
            success: false,
            message: "Please provide complete details."
        })
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        })
    }

    if(password.length < 8){
        return res.status(400).json({
            success: false,
            message: "password must be atleast 8 character long."
        })
    }

    const isEmailAlreadyUsed = await User.findOne({email});

    if(isEmailAlreadyUsed){
        return res.status(400).json({
            success: false,
            message: "Email is already Registered."
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        fullName, 
        email,
        password: hashedPassword,
        avatar: {
            public_id: "",
            url: "",

        }
    })

    generateToken(user, "User registered successfully", 201, res)
});

export const signin = catchAsyncError(async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "Please provide complete details."
        })
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({
            success: false,
            message: "Invalid email format."
        })
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({
            success: false,
            message: "Invalid Credetials."
        })
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if(!isPasswordMatched){
        return res.status(400).json({
            success: false,
            message: "Invalid password"
        })
    }

    generateToken(user, "User logged in successfully", 200, res);

});

export const signout = catchAsyncError(async (req, res, next) => {
    res.status(200).cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development" ? true : false 
    }).json({
        success: true,
        message: "User Logged-out successfully."
    })
});

export const getUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    res.status(200).json({
        success: true,
        user
    })
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
    const {fullName, email} = req.body;
    if(fullName?.trim().length === 0 || email?.trim().length === 0){
        return res.status(400).json({
            success: false,
            message: "fullName & email can't be empty."
        })
    }

    const avatar = req?.files?.avatar;
    let clodinaryResponse = {};

    if(avatar){
        try {
            const oldAvtarPublicID = req?.user?.avatar?.public_id;
            if(oldAvtarPublicID && oldAvtarPublicID.length > 0){
                await clodinary.uploader.destroy(oldAvtarPublicID);
            }

            clodinaryResponse = await clodinary.uploader.upload(avatar.tempFilePath, {
                folder: "chatApp",
                transformation: [
                    {width: 300, height: 300, crop: "limit"},
                    {quality: "auto"},
                    {fetch_format: "auto"}
                ]
            })
        } catch (error) {
            console.error("clodinary upload error: ", error);
            return res.status(500).json({
                success: false,
                message: "Failed to upload avatar. Please try agan later."
            })
        }
    }

    let data = {
        fullName,
        email
    }

    if(avatar && clodinaryResponse?.public_id && clodinaryResponse?.secure_url){
        data.avatar = {
            public_id: clodinaryResponse.public_id,
            url: clodinaryResponse.secure_url,
        };
    }

    let user = await User.findByIdAndUpdate(req.user._id, data, {
        new: true,
        runValidators: true    
    })

    res.status(200).json({
        success: true,
        message: "Profile updated successfully.",
        user
    })
});