import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema =new mongoose.Schema({
name:{
type:String,
required:[true,"please provide your name"],
minLength:[3,"name must contain atleast 3 characters"],
maxLength:[30,"name cannot exceed 30 character"],
},
email:{
type:String,
required:[true,"please provide your email"],
validate:[validator.isEmail,"please provide a valid email"],
},
phone:{
type:Number,
required:[true,"please provide a valid phone no."],

},
password:{
    type:String,
    required:[true,"please provide your password"],
    minLength:[8,"name must contain atleast 8 characters"],
maxLength:[32,"name cannot exceed 32 character"],
select:false
},
role:{
    type:String,
    required:[true,"please provide your role"],
    enum:["Job Seeker","Employer"],
},
createdAt:{
    type:Date,
    default:Date.now,

},

});

// hashing the password

userSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password, 10);
});
// comparing password
userSchema.methods.comparePassword=async function(enteredPassword){
return await bcrypt.compare(enteredPassword,this.password);
};
// generating a jwt token for authorisation

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,

    });
};

export const User=mongoose.model("User",userSchema);