const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../../middlewares/genrateToken');
const User = require("../../model/User");

const registerUser = expressAsyncHandler(async (req,res)=>{
    const{ email,name,contact,password,confirmPassword } = req?.body;
    //Check if user exists
    const userExist = await User.findOne({ email})
    if(userExist) throw new Error(`User ${name} already exists`);

    try {
        const user = await User.create({email,name,contact,password,confirmPassword})
        res.status(200).json(user)

    } catch (error) {
        res.json(error)
    }
});

// Fetch All users

const fetchUsers = expressAsyncHandler(async(req,res)=>{
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        res.json(error)
    }
})

// Login User

const loginUserCtrl = expressAsyncHandler(async (req,res)=>{
    const {email,password}= req?.body
    // Check user in db  
    const userFound = await User.findOne({email})
    
    // Check if ther password match
    if(userFound && (await userFound?.isPasswordMatch(password))){
        res.json({
            _id : userFound?._id,
            name : userFound?.name,
            email : userFound?.email,
            token : generateToken(userFound?._id)
        })
    } else{
        res.status(401);
        throw new Error('Invalid Login Crendentials');
    }
    
})

// user Profile

const userProfileCtrl = expressAsyncHandler(async (req,res) =>{
    try {
        const profile = await User.findById(req?.users?._id);
        res.json(profile);
    } catch (error) {
        res.json(error);
    }
})


module.exports = {registerUser,fetchUsers,loginUserCtrl,userProfileCtrl}