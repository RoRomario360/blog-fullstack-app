import express from 'express'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import {registerValidation} from "./validations/auth.js";
import {validationResult} from "express-validator";
import UserModel from './models/User.js'
import jwt from "jsonwebtoken";

//подключаем базу мангусе
mongoose.connect('mongodb+srv://admin:25522552@cluster0.2htwtwo.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => {
        console.log('DB ok')
    })
    .catch((err) => console.log('DB error', err))

const app = express()

//учим экспресс понимать json
app.use(express.json())

//authorized
app.post('/auth/login',async(req,res)=>{
    try{
        const user=await UserModel.findOne({email:req.body.email})
        if(!user){
           return req.status(404).json({
               message:'User is not found'
           })
        }
    }catch(err){}
})


app.post('/auth/register', registerValidation, async (req, res) => {
   try{
       const errors = validationResult(req)
       if (!errors.isEmpty()) {
           return res.status(400).json(errors.array())
       }

       const password = req.body.password
       const salt = await bcrypt.genSalt(10)
       const hash=await bcrypt.hash(password,salt)

       //user
       const doc = new UserModel({
           email: req.body.email,
           fullName: req.body.fullName,
           avatarUrl: req.body.avatarUrl,
           passwordHash:hash,
       })

       const user=await doc.save()
const token=jwt.sign({
    _id:user._id,

},
       'secret123',
    {
        expiresIn: '30d'
    }
    )
const {passwordHash,...userData}=user._doc
       res.json(
           {
               ...userData,
               token,
           }
           )

   }catch(err){
       console.log(err)
res.status(500).json({
    message:'Can not register user'
})
   }
})

//запускаем сервер,
app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server OK')
})
