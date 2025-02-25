import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: String,
    createAt:{
        type:Date,
        default:Date.now
    },
    isDelete:{
        type:Boolean,
        default:true
    }
})

userSchema.methods.isMatchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.getAuthToken = function(){
    return jwt.sign({_id: this._id}, process.env.JWT_SECRET_KEY)
}






export default mongoose.model('User',userSchema)


