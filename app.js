import express from 'express'
import cors from 'cors'
import { sendResponse } from './src/helper/sender.js'
import authRouter from './src/routes/auth.routes.js'

export const app = express()


app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api',authRouter)

app.get('/',(req,res)=>{
    const data ={
        message: 'Welcome to the API',
        name:'pny trings',
        age: 25,

    }
    sendResponse(res,false,'successfuly login',data)
})
