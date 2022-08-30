const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : [true,"Name is required"]
    },

    email:{
        type : String,
        required : [true,"Email is required"]
    },

    contact:{
        type : Number,
        required : [true,"Phone number is required"]
    },

    password:{
        type : String,
        required : [true,"Password is required"]
    },

    confirmPassword: {
        type : String,
        required : [true,"Confirm password is required"]
    },

    isAdmin: {
        type : Boolean,
        default : false,
    }
},
{
    timestamp: true
}
);

// Hash Password 

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt)
        
    }
    next();
})

// Verify The Password
userSchema.methods.isPasswordMatch = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}



const User = new  mongoose.model("user",userSchema);

module.exports = User;