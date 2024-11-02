import mongoose from "mongoose";
import bcrypt from  'bcryptjs'

const userSchema  = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    image:{
        type:String,
        default:''
    }
},{
    timestamps:true,
})
// const salt = await bcrypt.genSalt(10);
// this.password = await bcrypt.hash(this.password,salt);
// next()

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare (enteredPassword,this.password);
}

export default mongoose.model('User',userSchema)