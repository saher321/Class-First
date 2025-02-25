import { login, profile, resgister } from "../controlles/auth.controllers.js";
import express from "express";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router()


 router.post('/register', resgister)
 router.post('/login', login)

 router.get('/profile/:id',isAuth, profile)



 export default router;