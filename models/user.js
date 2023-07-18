const mongoose =require("mongoose");

const userschema = new mongoose.Schema({
    username:{
        type:String,
        required:[ true,"please enter the username"],
    },
    email:{
        type:String,
        required:[true,"please enter the email"],
    },
    password:{
        type:String,
        required:[true,"please add the user password"],
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model("user",userschema);