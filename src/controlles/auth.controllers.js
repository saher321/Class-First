
import { sendError, sendResponse, sendToken } from '../helper/sender.js'
import Users from '../models/auth.model.js'
import bcrypt from 'bcryptjs'



export const resgister = async (req, res )=>{
    try {

        const {name,email,password} = req.body

        
        if(!name ||!email ||!password){
            return sendResponse(res,false,'All fields are required!')
        }
        
        
        const user = await Users.findOne({email})
        if(user){
            return sendResponse(res,false,'User Already Exist!')
        }
        
        
        const hashPass = await bcrypt.hash(password,10)
        
        const add = new Users({
            name,
            email,
            password: hashPass
        })
        
        console.log(name,email,password)

        await add.save()
        sendResponse(res,true,'User Register Successfully!')

    } catch (error) {
        sendError(res,error)
    }
}

export const login = async (req, res )=>{
    try {

        const {email,password} = req.body

        
        if(!email ||!password){
            return sendResponse(res,false,'All fields are required!')
        }
        
        
        const user = await Users.findOne({email})
        if(!user){
            return sendResponse(res,false,'User Not Exist!')
        }
        
        
        const isMatch =  user.isMatchPassword(password)
        if(!isMatch){
            return sendResponse(res,false,'Incorrect Password!')
        }
        
        sendToken(res, user, 'login Successfully',)
        

    } catch (error) {
        sendError(res,error)
    }
}


export const profile = async (req, res )=>{
    try {

        const user = await Users.findById(req.params.id)
        if(!user){
            return sendResponse(res,false,'User Not Exist!')
        }
        
       sendResponse(res,true,'profile data', user)
        

    } catch (error) {
        sendError(res,error)
    }
}