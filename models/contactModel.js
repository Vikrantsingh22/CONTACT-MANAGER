const mongoose=require("mongoose");

const contactSchema=new mongoose.Schema({
    // whenever we are creating contact we need to associate the contact with the userid
    // who is creating it so we have to add a property user_id
    // this user_id is for user who is creating the contact
    user_id:{
        // type is objectid because this id is made inside the mongodb and  there we have the objectid
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: "user"
       // the reference of the model
       // model is user
    },


    name:{
        type:String,
        required:[true,"Please add contact name"],
    },
    email:{
        type:String,
        required:[true,"Please add the contact email"]
    },
    phone:{
        type:String,
        required:[true,"Please add the contact number"]
    }

},
{
    timestamps:true,
});

module.exports=mongoose.model("Contact",contactSchema)
