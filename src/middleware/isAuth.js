import jwt from "jsonwebtoken";
import { sendError, sendResponse } from "../helper/sender.js";

import Users from '../models/auth.model.js'


export const isAuth = async(req, res,next)=>{

    try {
        const token = req?.headers?.authorization?.split(' ')[1]

        if(!token){
            return sendResponse(res,false,'Token is required')
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = await Users.findById(decoded._id)

  next()
    } catch (error) {
        sendError(res,error)
    }

}



