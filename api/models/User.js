const mongoose=require('mongoose')
const joi=require('joi')
const UserSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 3
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 255,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        maxlength: 1024,
        minlength: 3
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        // array of ids
        default:[]
    },
    followings:{
        type:Array,
        // array of ids
        default:[]
    },
    isAdmin:{
 type:Boolean,
 default:false,

    }  ,

    desc: {
        type: String,
        max: 50,
      },
      city: {
        type: String,
        max: 50,
      },
      from: {
        type: String,
        max: 50,
      },
      relationship: {
        type: Number,
        enum: [1, 2, 3],
    // can either have one of these values
    },
},{timestamps:true})  
// this is used to logg when the event happened
module.exports=mongoose.model('User',UserSchema)


