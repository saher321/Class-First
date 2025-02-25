export const sendResponse = (res, status, message,data)=>{

    return res.status(200).json({status, success: status ? 'sucess': 'error', message,data})

}

export const sendError = (res,error)=>{

    return res.status(500).json({status:false, success:  'error', error: error.message})

}


export const sendToken = (res,user, message, content)=>{

    const token = user.getAuthToken()

    return res.status(200).json({
        
        accessToken: token,
        message,
        name: user.name,
        email: user.email,

    })
    

}